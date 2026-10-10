import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowLeftRight, Check, SlidersHorizontal, X } from 'lucide-react';
import AffiliateLink from '../components/AffiliateLink';
import PageMeta from '../components/PageMeta';
import ProductImageFrame from '../components/ProductImageFrame';
import { useProductsBySlugs } from '../hooks/useProducts';
import useProductSlugs from '../hooks/useProductSlugs';
import { COMPARE_PRODUCTS_KEY, MAX_COMPARE_PRODUCTS } from '../utils/productPreferences';
import { getAmazonImageSrcSets } from '../utils/amazonImageSrcSets';

const PRIORITY_SPEC_ORDER = ['material', 'capacity', 'dimensions', 'power', 'color', 'finish', 'compatibility', 'warranty'];
const INITIAL_SPEC_COUNT = 8;

const normalizeSpecKey = (key) => String(key).trim().toLocaleLowerCase();

const labelFor = (value) => String(value)
  .replace(/([a-z])([A-Z])/g, '$1 $2')
  .replace(/[_-]+/g, ' ')
  .replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatValue = (value) => {
  if (value === null || value === undefined || value === '') return 'Not listed';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (Array.isArray(value)) return value.map((item) => String(item)).join(', ');
  if (typeof value === 'object') return Object.entries(value).map(([key, item]) => `${labelFor(key)}: ${String(item)}`).join(' · ');
  return String(value);
};

const formatPrice = (value) => Number.isFinite(value) ? `$${value.toFixed(2)}` : 'Not listed';

const normalizeComparableValue = (value) => String(value)
  .normalize('NFKC')
  .trim()
  .replace(/\s+/g, ' ')
  .toLocaleLowerCase();

const isMissingValue = (value) => ['not listed', 'not rated', 'n/a', 'na', ''].includes(normalizeComparableValue(value));

const hasListedValue = (value) => {
  if (value === null || value === undefined || isMissingValue(value)) return false;
  if (Array.isArray(value)) return value.some(hasListedValue);
  if (typeof value === 'object') return Object.values(value).some(hasListedValue);
  return true;
};

function compareRowValues(values) {
  const presentValues = values.map(normalizeComparableValue).filter((value) => !isMissingValue(value));
  const distinctValues = new Set(presentValues);
  return { hasDifferentValues: distinctValues.size > 1 };
}

function getComparableSpecs(products) {
  const valuesByProduct = products.map((product) => {
    const specs = product.specs && typeof product.specs === 'object' && !Array.isArray(product.specs) ? product.specs : {};
    return new Map(Object.entries(specs)
      .filter(([, value]) => hasListedValue(value))
      .map(([key, value]) => [normalizeSpecKey(key), { label: labelFor(key), value }]));
  });
  const keys = new Map();
  valuesByProduct.forEach((specs) => specs.forEach((item, key) => {
    if (!keys.has(key)) keys.set(key, item.label);
  }));

  return [...keys].map(([key, label]) => ({
    key,
    label,
    values: valuesByProduct.map((specs) => specs.get(key)?.value),
  })).sort((left, right) => {
    const leftPriority = PRIORITY_SPEC_ORDER.indexOf(left.key);
    const rightPriority = PRIORITY_SPEC_ORDER.indexOf(right.key);
    const leftRank = leftPriority < 0 ? PRIORITY_SPEC_ORDER.length : leftPriority;
    const rightRank = rightPriority < 0 ? PRIORITY_SPEC_ORDER.length : rightPriority;
    return leftRank - rightRank || left.label.localeCompare(right.label);
  });
}

function ProductHeading({ product, onRemove }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex items-start justify-between gap-2">
        <Link to={`/product/${product.slug}`} className="min-h-10 min-w-0 flex-1 font-semibold leading-snug text-gray-950 underline-offset-2 hover:underline">
          <span className="line-clamp-2">{product.name}</span>
        </Link>
        <button type="button" onClick={() => onRemove(product.slug)} aria-label={`Remove ${product.name} from comparison`} title="Remove from comparison" className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700">
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-auto flex gap-2 pt-3">
        <Link to={`/product/${product.slug}`} className="inline-flex min-h-9 flex-1 items-center justify-center rounded-lg border border-gray-300 px-2 text-xs font-semibold text-gray-800 transition hover:border-gray-500">Details</Link>
        <AffiliateLink href={product.affiliateUrl} className="inline-flex min-h-9 flex-1 items-center justify-center rounded-lg bg-[#dcb589] px-2 text-xs font-semibold text-gray-950 transition hover:bg-[#cba478] aria-disabled:cursor-not-allowed aria-disabled:opacity-50" fallback="Link soon">Amazon</AffiliateLink>
      </div>
    </div>
  );
}

function ComparisonTable({ products, specs, onRemove }) {
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [sharedSpecsOnly, setSharedSpecsOnly] = useState(false);
  const coreRows = [
    { key: 'price', label: 'Price', values: products.map((product) => formatPrice(product.price)) },
    { key: 'rating', label: 'Rating', values: products.map((product) => Number.isFinite(product.rating) ? `${product.rating.toFixed(1)} / 5` : 'Not rated') },
    { key: 'reviews', label: 'Customer ratings', values: products.map((product) => product.reviewCount ? Number(product.reviewCount).toLocaleString() : 'Not listed') },
    { key: 'brand', label: 'Brand', values: products.map((product) => product.brandName || 'Not listed') },
    { key: 'model', label: 'Model', values: products.map((product) => product.modelNumber || 'Not listed') },
  ];
  const commonSpecs = specs.filter((spec) => spec.values.every(hasListedValue));
  const availableSpecs = sharedSpecsOnly ? commonSpecs : specs;
  const visibleSpecs = showAllSpecs ? availableSpecs : availableSpecs.slice(0, INITIAL_SPEC_COUNT);
  const rows = [
    ...coreRows,
    ...visibleSpecs.map((spec) => ({ key: spec.key, label: spec.label, values: spec.values.map(formatValue) })),
  ].map((row) => ({ ...row, comparison: compareRowValues(row.values) }));
  const toggleClassName = `inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 ${sharedSpecsOnly ? 'border-gray-900 bg-gray-900 text-white hover:bg-gray-800' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-500 hover:text-gray-950'}`;
  const noCommonSpecs = sharedSpecsOnly && commonSpecs.length === 0;

  return (
    <>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">Filter out specifications missing from any selected product.</p>
        <button type="button" onClick={() => {
          setSharedSpecsOnly((current) => !current);
          setShowAllSpecs(false);
        }} aria-pressed={sharedSpecsOnly} className={toggleClassName}>
          <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
          Specs in all {products.length}
          <span className={`rounded-full px-1.5 py-0.5 text-xs ${sharedSpecsOnly ? 'bg-white/15 text-white' : 'bg-gray-100 text-gray-600'}`}>{commonSpecs.length}</span>
        </button>
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-gray-200 bg-white lg:block">
        <table className="w-full min-w-[850px] table-fixed border-separate border-spacing-0 text-left text-sm">
          <caption className="sr-only">Side-by-side comparison of selected kitchen products</caption>
          <thead>
            <tr className="border-b border-gray-200 bg-[#faf9f6]">
              <th scope="col" className="w-44 p-4 align-top text-xs font-semibold uppercase tracking-wide text-gray-500">Product</th>
              {products.map((product) => <th key={product.id} scope="col" className="p-3 align-top">
                <div className="mx-auto flex h-full max-w-[240px] flex-col rounded-xl border border-gray-200 bg-white p-3 text-left shadow-sm">
                  <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`} className="block">
                    <ProductImageFrame src={product.image} {...getAmazonImageSrcSets(product.image)} sizes="200px" alt={product.name} aspectRatio={false} imageFit="contain" className="mx-auto mb-3 h-[184px] max-w-[210px]" />
                  </Link>
                  <ProductHeading product={product} onRemove={onRemove} />
                </div>
              </th>)}
            </tr>
          </thead>
          <tbody>{rows.map((row, rowIndex) => <tr key={row.key} className={`border-b border-gray-100 last:border-0 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'}`}>
            <th scope="row" className="px-4 py-3 font-semibold text-gray-800">
              {row.label}
            </th>
            {row.values.map((value, index) => <td key={`${row.key}-${products[index].id}`} className={`break-words px-4 py-3 ${isMissingValue(value) ? 'text-gray-400' : row.comparison.hasDifferentValues ? 'font-semibold text-gray-950' : 'text-gray-700'}`}>
              {value}
            </td>)}
          </tr>)}
            {noCommonSpecs && <tr><td colSpan={products.length + 1} className="px-5 py-8 text-center text-sm text-gray-600">No specifications are listed for every selected product. Turn off this filter to see all listed details.</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="space-y-5 lg:hidden">
        <section aria-labelledby="mobile-compare-products" className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <h2 id="mobile-compare-products" className="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-900">Products in this comparison</h2>
          <ul className="divide-y divide-gray-100">
            {products.map((product, index) => <li key={product.id} className="flex min-w-0 items-center gap-3 p-3">
              <span aria-label={`Product ${index + 1}`} className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[11px] font-bold text-gray-700">{index + 1}</span>
              <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`} className="w-14 shrink-0">
                <ProductImageFrame src={product.image} {...getAmazonImageSrcSets(product.image)} sizes="56px" alt={product.name} imageFit="contain" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link to={`/product/${product.slug}`} className="line-clamp-2 text-xs font-semibold leading-snug text-gray-900 hover:underline">{product.name}</Link>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold">
                  <Link to={`/product/${product.slug}`} className="text-gray-600 underline-offset-2 hover:text-gray-950 hover:underline">Details</Link>
                  <AffiliateLink href={product.affiliateUrl} className="text-gray-700 underline-offset-2 hover:text-gray-950 hover:underline aria-disabled:opacity-50" fallback="Link soon">Amazon</AffiliateLink>
                </div>
              </div>
              <button type="button" onClick={() => onRemove(product.slug)} aria-label={`Remove ${product.name} from comparison`} title="Remove from comparison" className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700">
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </li>)}
          </ul>
        </section>

        <section aria-label="Compare product details" className="overflow-hidden rounded-2xl border border-gray-200 bg-white divide-y divide-gray-100">
          {rows.map((row) => <div key={row.key} className="px-4 py-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-gray-900">{row.label}</h3>
            </div>
            <dl className="mt-2 divide-y divide-gray-100">
              {row.values.map((value, index) => {
                const product = products[index];
                const productLabel = product.name.split(/[,|]/)[0].trim() || product.brandName || `Product ${index + 1}`;
                const isMissing = isMissingValue(value);
                return <div key={`${row.key}-${product.id}`} className="flex items-center justify-between gap-4 py-2 first:pt-0 last:pb-0">
                  <dt className="flex min-w-0 items-center gap-2 text-xs text-gray-600" title={product.name}>
                    <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-700">{index + 1}</span>
                    <span className="line-clamp-1">{productLabel}</span>
                  </dt>
                  <dd className={`max-w-[48%] break-words text-right text-sm ${isMissing ? 'text-gray-400' : row.comparison.hasDifferentValues ? 'rounded-md bg-gray-100 px-2 py-1 font-semibold text-gray-950' : row.key === 'price' ? 'font-bold text-gray-950' : 'text-gray-800'}`}>{value}</dd>
                </div>;
              })}
            </dl>
          </div>)}
          {noCommonSpecs && <p role="status" className="px-5 py-8 text-center text-sm text-gray-600">No specifications are listed for every selected product. Turn off this filter to see all listed details.</p>}
        </section>
      </div>

      {availableSpecs.length > INITIAL_SPEC_COUNT && <div className="mt-5 text-center">
        <button type="button" onClick={() => setShowAllSpecs((current) => !current)} aria-expanded={showAllSpecs} className="inline-flex min-h-10 items-center justify-center rounded-full border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-700 transition hover:border-gray-500 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2">
          {showAllSpecs ? 'Show fewer specifications' : `Show all ${availableSpecs.length} specifications`}
        </button>
      </div>}
      <p className="mt-4 text-xs leading-5 text-gray-500">“Not listed” means the catalog does not provide that detail. Confirm current price, availability, and specifications with the retailer before purchasing.</p>
    </>
  );
}

export default function CompareProducts() {
  const { slugs, isReady, removeSlug, clear } = useProductSlugs(COMPARE_PRODUCTS_KEY, MAX_COMPARE_PRODUCTS);
  const querySlugs = useMemo(() => slugs.length >= 2 ? slugs : [], [slugs]);
  const { data = [], isPending, isError, refetch } = useProductsBySlugs(querySlugs);
  const products = useMemo(() => {
    const bySlug = new Map(data.map((product) => [product.slug, product]));
    return querySlugs.map((slug) => bySlug.get(slug)).filter(Boolean);
  }, [data, querySlugs]);
  const specs = useMemo(() => getComparableSpecs(products), [products]);
  const unavailableSlugs = querySlugs.filter((slug) => !products.some((product) => product.slug === slug));

  return (
    <main className="min-h-[60vh] w-full bg-[#fcfcfc] py-10 sm:py-14">
      <PageMeta title="Compare Kitchen Products | KitchenTrusted" description="Compare selected kitchen products side by side by price, customer rating, brand, and listed specifications." robots="noindex,follow" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 text-xs text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-black">Home</Link><span className="mx-2">/</span><Link to="/products" className="hover:text-black">Products</Link><span className="mx-2">/</span><span className="font-medium text-gray-900">Compare</span>
        </nav>
        <header className="mb-8 flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">Compare products</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">Review key details side by side. Choose up to {MAX_COMPARE_PRODUCTS} products; missing information is marked “Not listed.”</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Link to="/products" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 text-sm font-semibold text-gray-700 transition hover:border-gray-500 hover:text-gray-950"><ArrowLeft aria-hidden="true" className="h-4 w-4" />Browse products</Link>
            {slugs.length > 0 && <button type="button" onClick={clear} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 text-sm font-semibold text-gray-700 transition hover:border-gray-500 hover:text-gray-950"><X aria-hidden="true" className="h-4 w-4" />Clear</button>}
          </div>
        </header>

        {!isReady ? (
          <p role="status" className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">Loading your comparison…</p>
        ) : slugs.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm sm:px-12">
            <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-700"><ArrowLeftRight aria-hidden="true" className="h-7 w-7" /></span>
            <h2 className="text-xl font-bold text-gray-950">Start with two products</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">Select Compare on products you’re considering. Your shortlist stays on this device, and you can add up to three products.</p>
            <Link to="/products" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-gray-950 px-5 text-sm font-semibold text-white transition hover:bg-gray-800">Browse products</Link>
          </div>
        ) : slugs.length < 2 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center sm:p-10">
            <h2 className="text-lg font-bold text-gray-950">Choose one more product</h2>
            <p className="mt-2 text-sm text-gray-600">You have one product selected. Add at least one more to see a useful comparison.</p>
            <Link to="/products" className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-gray-950 px-4 text-sm font-semibold text-white transition hover:bg-gray-800">Continue browsing</Link>
          </div>
        ) : isPending ? (
          <p role="status" className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">Loading product details…</p>
        ) : isError ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
            <p className="font-semibold text-gray-900">We couldn’t load these product details.</p>
            <button type="button" onClick={() => refetch()} className="mt-4 rounded-lg bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800">Try again</button>
          </div>
        ) : products.length < 2 ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <h2 className="font-bold text-gray-950">Some selected products are no longer available</h2>
            <p className="mt-2 text-sm text-gray-700">Remove the unavailable item, then choose another product to compare.</p>
            <div className="mt-4 flex flex-wrap gap-2">{unavailableSlugs.map((slug) => <button key={slug} type="button" onClick={() => removeSlug(slug)} className="rounded-full border border-amber-300 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:border-amber-500">Remove unavailable item</button>)}</div>
          </div>
        ) : (
          <>
            {unavailableSlugs.length > 0 && <div role="status" className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-gray-800">
              <span>One selected product is no longer available in the catalog.</span>
              {unavailableSlugs.map((slug) => <button key={slug} type="button" onClick={() => removeSlug(slug)} className="font-semibold underline underline-offset-2">Remove unavailable item</button>)}
            </div>}
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-gray-700"><Check aria-hidden="true" className="h-4 w-4 text-gray-700" />{products.length} products selected</div>
            <ComparisonTable products={products} specs={specs} onRemove={removeSlug} />
          </>
        )}
      </div>
    </main>
  );
}
