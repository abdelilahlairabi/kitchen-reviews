import test from 'node:test';
import assert from 'node:assert/strict';
import { createAmazonVariantUrl, isValidAmazonProductUrl } from '../src/utils/affiliate.js';

test('accepts only secure Amazon product destinations with a valid ASIN', () => {
  assert.equal(isValidAmazonProductUrl('https://www.amazon.com/dp/B0BXXKFJK2?tag=kitchentrusted-20'), true);
  assert.equal(isValidAmazonProductUrl('https://amazon.com/gp/product/B0BXXKFJK2'), true);
  assert.equal(isValidAmazonProductUrl('https://amzn.to/abc123'), true);
  assert.equal(isValidAmazonProductUrl('http://amazon.com/dp/B0BXXKFJK2'), false);
  assert.equal(isValidAmazonProductUrl('https://example.com/dp/B0BXXKFJK2'), false);
  assert.equal(isValidAmazonProductUrl('https://amazon.com/dp/not-an-asin'), false);
});

test('variant links point to the selected ASIN and preserve the affiliate tag', () => {
  assert.equal(
    createAmazonVariantUrl({
      asin: 'b0hjzp4vpj',
      marketplace: 'amazon.com',
      affiliateUrl: 'https://www.amazon.com/dp/B0BXXKFJK2?tag=kitchentrusted-20&linkCode=abc',
    }),
    'https://amazon.com/dp/B0HJZP4VPJ?tag=kitchentrusted-20',
  );
});

test('invalid variant ASINs never produce outbound links', () => {
  assert.equal(createAmazonVariantUrl({ asin: '‎B0HJZP4VPJ', marketplace: 'amazon.com' }), null);
  assert.equal(createAmazonVariantUrl({ asin: 'too-short' }), null);
});
