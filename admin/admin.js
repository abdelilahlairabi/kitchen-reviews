const form = document.querySelector('#product-form');
const list = document.querySelector('#product-list');
const categorySelect = document.querySelector('#category');
const formTitle = document.querySelector('#form-title');
const cancelButton = document.querySelector('#cancel');
const message = document.querySelector('#message');
const categoryForm = document.querySelector('#category-form');
const categoryList = document.querySelector('#category-list');
const categoryFormTitle = document.querySelector('#category-form-title');
const categoryCancelButton = document.querySelector('#category-cancel');
const collectionForm = document.querySelector('#collection-form');
const collectionList = document.querySelector('#collection-list');
const collectionFormTitle = document.querySelector('#collection-form-title');
const collectionCancelButton = document.querySelector('#collection-cancel');
const collectionProducts = document.querySelector('#collection-products');
const guideForm = document.querySelector('#guide-form');
const guideList = document.querySelector('#guide-list');
const guideFormTitle = document.querySelector('#guide-form-title');
const guideCancelButton = document.querySelector('#guide-cancel');
const guideProducts = document.querySelector('#guide-products');
const styleForm = document.querySelector('#style-form');
const styleList = document.querySelector('#style-list');
const styleFormTitle = document.querySelector('#style-form-title');
const styleCancelButton = document.querySelector('#style-cancel');
const styleProducts = document.querySelector('#style-products');
const productDetailsForm = document.querySelector('#product-details-form');
const detailsProduct = document.querySelector('#details-product');
const importForm = document.querySelector('#import-form');
const importCsv = document.querySelector('#import-csv');
const googleSheetUrl = document.querySelector('#google-sheet-url');
const loadSheetButton = document.querySelector('#load-sheet');
const previewImportButton = document.querySelector('#preview-import');
const confirmImportButton = document.querySelector('#confirm-import');
const importResult = document.querySelector('#import-result');
let products = [];
let categories = [];
let collections = [];
let guides = [];
let styles = [];
let editingId = null;
let editingCategoryId = null;
let editingCollectionId = null;
let editingGuideId = null;
let editingStyleId = null;

const notify = (text, type = 'success') => {
  message.textContent = text;
  message.className = type;
};

const request = async (url, options = {}) => {
  const response = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options });
  const payload = response.status === 204 ? {} : await response.json();
  if (!response.ok) throw new Error(payload.error || 'Request failed.');
  return payload;
};

const resetForm = () => {
  editingId = null;
  form.reset();
  form.specs.value = '{}';
  formTitle.textContent = 'Add product';
  cancelButton.hidden = true;
};

const render = () => {
  const categoryName = new Map(categories.map((category) => [category.id, category.name]));
  list.replaceChildren(...products.map((product) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td><strong>${escapeHtml(product.name)}</strong><br><small>${escapeHtml(product.slug)}</small></td><td>${escapeHtml(categoryName.get(product.category_id) || '—')}</td><td>${product.price == null ? '—' : `$${Number(product.price).toFixed(2)}`}</td><td class="actions"></td>`;
    const actions = row.querySelector('.actions');
    const edit = document.createElement('button'); edit.textContent = 'Edit'; edit.className = 'secondary'; edit.onclick = () => startEdit(product);
    const remove = document.createElement('button'); remove.textContent = 'Delete'; remove.className = 'danger'; remove.onclick = () => deleteProduct(product);
    actions.append(edit, remove);
    return row;
  }));
};

const renderProductDetailsChoices = () => {
  const selected = detailsProduct.value;
  detailsProduct.replaceChildren(new Option('Select a product', ''), ...products.map((product) => new Option(product.name, product.id)));
  detailsProduct.value = selected;
};

const loadProductDetails = async () => {
  if (!detailsProduct.value) {
    productDetailsForm.elements.images.value = '';
    productDetailsForm.elements.reviews.value = '[]';
    return;
  }
  try {
    const details = await request(`/api/products/${detailsProduct.value}/details`);
    productDetailsForm.elements.images.value = details.images.join('\n');
    productDetailsForm.elements.reviews.value = JSON.stringify(details.reviews, null, 2);
  } catch (error) { notify(error.message, 'error'); }
};

const previewImport = async () => {
  confirmImportButton.hidden = true;
  importResult.textContent = '';
  try {
    const preview = await request('/api/import/products/preview', { method: 'POST', body: JSON.stringify({ csv: importCsv.value }) });
    const lines = [`Valid rows: ${preview.valid_count}`, `Rows with errors: ${preview.error_count}`];
    if (preview.sample.length) lines.push('', 'Sample:', ...preview.sample.map((row) => `${row.slug} — ${row.name} (${row.price == null ? 'no price' : `$${row.price}`})`));
    if (preview.errors.length) lines.push('', 'Errors:', ...preview.errors.map((error) => `Row ${error.row}: ${error.message}`));
    importResult.textContent = lines.join('\n');
    if (preview.valid_count > 0 && preview.error_count === 0) confirmImportButton.hidden = false;
  } catch (error) { importResult.textContent = error.message; notify(error.message, 'error'); }
};

const renderCategories = () => {
  categoryList.replaceChildren(...categories.map((category) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td><strong>${escapeHtml(category.name)}</strong></td><td>${escapeHtml(category.slug)}</td><td>${escapeHtml((category.sub_filters || []).join(', ') || '—')}</td><td class="actions"></td>`;
    const actions = row.querySelector('.actions');
    const edit = document.createElement('button'); edit.textContent = 'Edit'; edit.className = 'secondary'; edit.onclick = () => startCategoryEdit(category);
    const remove = document.createElement('button'); remove.textContent = 'Delete'; remove.className = 'danger'; remove.onclick = () => deleteCategory(category);
    actions.append(edit, remove);
    return row;
  }));
};

const renderCollections = () => {
  collectionList.replaceChildren(...collections.map((collection) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td><strong>${escapeHtml(collection.name)}</strong><br><small>${escapeHtml(collection.slug)}</small></td><td>${collection.product_ids.length}</td><td>${collection.featured ? 'Yes' : '—'}</td><td class="actions"></td>`;
    const actions = row.querySelector('.actions');
    const edit = document.createElement('button'); edit.textContent = 'Edit'; edit.className = 'secondary'; edit.onclick = () => startCollectionEdit(collection);
    const remove = document.createElement('button'); remove.textContent = 'Delete'; remove.className = 'danger'; remove.onclick = () => deleteCollection(collection);
    actions.append(edit, remove);
    return row;
  }));
};

const renderCollectionProductChoices = () => {
  collectionProducts.replaceChildren(...products.map((product) => new Option(product.name, product.id)));
};

const renderGuides = () => {
  guideList.replaceChildren(...guides.map((guide) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td><strong>${escapeHtml(guide.title)}</strong><br><small>${escapeHtml(guide.slug)}</small></td><td>${guide.faqs.length}</td><td>${guide.product_ids.length}</td><td class="actions"></td>`;
    const actions = row.querySelector('.actions');
    const edit = document.createElement('button'); edit.textContent = 'Edit'; edit.className = 'secondary'; edit.onclick = () => startGuideEdit(guide);
    const remove = document.createElement('button'); remove.textContent = 'Delete'; remove.className = 'danger'; remove.onclick = () => deleteGuide(guide);
    actions.append(edit, remove);
    return row;
  }));
};

const renderGuideProductChoices = () => {
  guideProducts.replaceChildren(...products.map((product) => new Option(product.name, product.id)));
};

const renderStyles = () => {
  styleList.replaceChildren(...styles.map((style) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td><strong>${escapeHtml(style.title)}</strong><br><small>${escapeHtml(style.slug)}</small></td><td>${style.gallery.length}</td><td>${style.product_ids.length}</td><td class="actions"></td>`;
    const actions = row.querySelector('.actions');
    const edit = document.createElement('button'); edit.textContent = 'Edit'; edit.className = 'secondary'; edit.onclick = () => startStyleEdit(style);
    const remove = document.createElement('button'); remove.textContent = 'Delete'; remove.className = 'danger'; remove.onclick = () => deleteStyle(style);
    actions.append(edit, remove);
    return row;
  }));
};

const renderStyleProductChoices = () => {
  styleProducts.replaceChildren(...products.map((product) => new Option(product.name, product.id)));
};

const escapeHtml = (value) => String(value || '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);

const startEdit = (product) => {
  editingId = product.id;
  for (const [key, value] of Object.entries(product)) {
    if (!form.elements[key]) continue;
    form.elements[key].value = value ?? '';
  }
  form.types.value = (product.type || []).join(', ');
  form.features.value = (product.features || []).join('\n');
  form.specs.value = JSON.stringify(product.specs || {}, null, 2);
  formTitle.textContent = `Edit: ${product.name}`;
  cancelButton.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const resetCategoryForm = () => {
  editingCategoryId = null;
  categoryForm.reset();
  categoryFormTitle.textContent = 'Add category';
  categoryCancelButton.hidden = true;
};

const startCategoryEdit = (category) => {
  editingCategoryId = category.id;
  categoryForm.elements.name.value = category.name;
  categoryForm.elements.slug.value = category.slug;
  categoryForm.elements.hero_image.value = category.hero_image || '';
  categoryForm.elements.description.value = category.description || '';
  categoryForm.elements.sub_filters.value = (category.sub_filters || []).join(', ');
  categoryFormTitle.textContent = `Edit: ${category.name}`;
  categoryCancelButton.hidden = false;
  categoryForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const resetCollectionForm = () => {
  editingCollectionId = null;
  collectionForm.reset();
  [...collectionProducts.options].forEach((option) => { option.selected = false; });
  collectionFormTitle.textContent = 'Add collection';
  collectionCancelButton.hidden = true;
};

const startCollectionEdit = (collection) => {
  editingCollectionId = collection.id;
  for (const [key, value] of Object.entries(collection)) {
    if (collectionForm.elements[key]) collectionForm.elements[key].value = value ?? '';
  }
  collectionForm.elements.featured.checked = collection.featured;
  [...collectionProducts.options].forEach((option) => { option.selected = collection.product_ids.includes(option.value); });
  collectionFormTitle.textContent = `Edit: ${collection.name}`;
  collectionCancelButton.hidden = false;
  collectionForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const resetGuideForm = () => {
  editingGuideId = null;
  guideForm.reset();
  guideForm.elements.comparison_types.value = '[]';
  guideForm.elements.comparison_finishes.value = '[]';
  guideForm.elements.faqs.value = '[]';
  [...guideProducts.options].forEach((option) => { option.selected = false; });
  guideFormTitle.textContent = 'Add guide';
  guideCancelButton.hidden = true;
};

const startGuideEdit = (guide) => {
  editingGuideId = guide.id;
  for (const [key, value] of Object.entries(guide)) {
    if (guideForm.elements[key]) guideForm.elements[key].value = value ?? '';
  }
  guideForm.elements.comparison_types.value = JSON.stringify(guide.comparison_types || [], null, 2);
  guideForm.elements.comparison_finishes.value = JSON.stringify(guide.comparison_finishes || [], null, 2);
  guideForm.elements.faqs.value = JSON.stringify(guide.faqs || [], null, 2);
  [...guideProducts.options].forEach((option) => { option.selected = guide.product_ids.includes(option.value); });
  guideFormTitle.textContent = `Edit: ${guide.title}`;
  guideCancelButton.hidden = false;
  guideForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const resetStyleForm = () => {
  editingStyleId = null;
  styleForm.reset();
  [...styleProducts.options].forEach((option) => { option.selected = false; });
  styleFormTitle.textContent = 'Add inspiration style';
  styleCancelButton.hidden = true;
};

const startStyleEdit = (style) => {
  editingStyleId = style.id;
  for (const [key, value] of Object.entries(style)) {
    if (styleForm.elements[key]) styleForm.elements[key].value = value ?? '';
  }
  styleForm.elements.tags.value = (style.tags || []).join(', ');
  styleForm.elements.gallery.value = (style.gallery || []).join('\n');
  [...styleProducts.options].forEach((option) => { option.selected = style.product_ids.includes(option.value); });
  styleFormTitle.textContent = `Edit: ${style.title}`;
  styleCancelButton.hidden = false;
  styleForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const deleteProduct = async (product) => {
  if (!window.confirm(`Delete “${product.name}”? This cannot be undone.`)) return;
  try { await request(`/api/products/${product.id}`, { method: 'DELETE' }); await load(); notify('Product deleted.'); } catch (error) { notify(error.message, 'error'); }
};

const deleteCategory = async (category) => {
  if (!window.confirm(`Delete “${category.name}”? Products in this category must be moved first.`)) return;
  try { await request(`/api/categories/${category.id}`, { method: 'DELETE' }); await load(); notify('Category deleted.'); } catch (error) { notify(error.message, 'error'); }
};

const deleteCollection = async (collection) => {
  if (!window.confirm(`Delete “${collection.name}”? This cannot be undone.`)) return;
  try { await request(`/api/collections/${collection.id}`, { method: 'DELETE' }); await load(); notify('Collection deleted.'); } catch (error) { notify(error.message, 'error'); }
};

const deleteGuide = async (guide) => {
  if (!window.confirm(`Delete “${guide.title}”? This cannot be undone.`)) return;
  try { await request(`/api/guides/${guide.id}`, { method: 'DELETE' }); await load(); notify('Guide deleted.'); } catch (error) { notify(error.message, 'error'); }
};

const deleteStyle = async (style) => {
  if (!window.confirm(`Delete “${style.title}”? This cannot be undone.`)) return;
  try { await request(`/api/styles/${style.id}`, { method: 'DELETE' }); await load(); notify('Style deleted.'); } catch (error) { notify(error.message, 'error'); }
};

const load = async () => {
  const [categoryData, productData, collectionData, guideData, styleData] = await Promise.all([request('/api/categories'), request('/api/products'), request('/api/collections'), request('/api/guides'), request('/api/styles')]);
  categories = categoryData.categories;
  products = productData.products;
  collections = collectionData.collections;
  guides = guideData.guides;
  styles = styleData.styles;
  categorySelect.replaceChildren(new Option('No category', ''), ...categories.map((category) => new Option(category.name, category.id)));
  renderProductDetailsChoices();
  render();
  renderCategories();
  renderCollectionProductChoices();
  renderCollections();
  renderGuideProductChoices();
  renderGuides();
  renderStyleProductChoices();
  renderStyles();
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(form));
  try {
    await request(editingId ? `/api/products/${editingId}` : '/api/products', { method: editingId ? 'PATCH' : 'POST', body: JSON.stringify(payload) });
    await load();
    notify(editingId ? 'Product updated.' : 'Product created.');
    resetForm();
  } catch (error) { notify(error.message, 'error'); }
});

detailsProduct.addEventListener('change', () => { loadProductDetails(); });
productDetailsForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!detailsProduct.value) return notify('Choose a product first.', 'error');
  const payload = Object.fromEntries(new FormData(productDetailsForm));
  payload.images = String(payload.images || '').split('\n').map((image) => image.trim()).filter(Boolean);
  try { payload.reviews = JSON.parse(payload.reviews || '[]'); } catch { return notify('Reviews must be valid JSON.', 'error'); }
  try {
    await request(`/api/products/${detailsProduct.value}/details`, { method: 'PATCH', body: JSON.stringify(payload) });
    notify('Gallery and reviews updated.');
  } catch (error) { notify(error.message, 'error'); }
});

loadSheetButton.addEventListener('click', async () => {
  if (!googleSheetUrl.value) return notify('Paste a public Google Sheet URL first.', 'error');
  try {
    const data = await request('/api/import/products/source', { method: 'POST', body: JSON.stringify({ google_sheet_url: googleSheetUrl.value }) });
    importCsv.value = data.csv;
    notify('Google Sheet loaded. Review the preview before importing.');
    previewImport();
  } catch (error) { notify(error.message, 'error'); }
});
previewImportButton.addEventListener('click', previewImport);
importForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (confirmImportButton.hidden) return notify('Preview a valid CSV before importing.', 'error');
  if (!window.confirm('Import these products? Existing products with the same slug will be updated. Nothing will be deleted.')) return;
  try {
    const result = await request('/api/import/products', { method: 'POST', body: JSON.stringify({ csv: importCsv.value }) });
    await load();
    notify(`${result.imported} products imported.`);
    importResult.textContent = `${result.imported} products imported successfully.`;
    confirmImportButton.hidden = true;
  } catch (error) { notify(error.message, 'error'); }
});

cancelButton.addEventListener('click', resetForm);
categoryForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(categoryForm));
  try {
    await request(editingCategoryId ? `/api/categories/${editingCategoryId}` : '/api/categories', { method: editingCategoryId ? 'PATCH' : 'POST', body: JSON.stringify(payload) });
    await load();
    notify(editingCategoryId ? 'Category updated.' : 'Category created.');
    resetCategoryForm();
  } catch (error) { notify(error.message, 'error'); }
});
categoryCancelButton.addEventListener('click', resetCategoryForm);
collectionForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(collectionForm));
  payload.featured = collectionForm.elements.featured.checked;
  payload.product_ids = [...collectionProducts.selectedOptions].map((option) => option.value);
  try {
    await request(editingCollectionId ? `/api/collections/${editingCollectionId}` : '/api/collections', { method: editingCollectionId ? 'PATCH' : 'POST', body: JSON.stringify(payload) });
    await load();
    notify(editingCollectionId ? 'Collection updated.' : 'Collection created.');
    resetCollectionForm();
  } catch (error) { notify(error.message, 'error'); }
});
collectionCancelButton.addEventListener('click', resetCollectionForm);
guideForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(guideForm));
  payload.product_ids = [...guideProducts.selectedOptions].map((option) => option.value);
  try {
    await request(editingGuideId ? `/api/guides/${editingGuideId}` : '/api/guides', { method: editingGuideId ? 'PATCH' : 'POST', body: JSON.stringify(payload) });
    await load();
    notify(editingGuideId ? 'Guide updated.' : 'Guide created.');
    resetGuideForm();
  } catch (error) { notify(error.message, 'error'); }
});
guideCancelButton.addEventListener('click', resetGuideForm);
styleForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(styleForm));
  payload.gallery = String(payload.gallery || '').split('\n').map((image) => image.trim()).filter(Boolean);
  payload.product_ids = [...styleProducts.selectedOptions].map((option) => option.value);
  try {
    await request(editingStyleId ? `/api/styles/${editingStyleId}` : '/api/styles', { method: editingStyleId ? 'PATCH' : 'POST', body: JSON.stringify(payload) });
    await load();
    notify(editingStyleId ? 'Style updated.' : 'Style created.');
    resetStyleForm();
  } catch (error) { notify(error.message, 'error'); }
});
styleCancelButton.addEventListener('click', resetStyleForm);
load().catch((error) => notify(error.message, 'error'));
