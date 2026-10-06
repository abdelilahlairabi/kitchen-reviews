import { isValidAmazonProductUrl } from '../utils/affiliate';

export default function AffiliateLink({ href, className, children, fallback = 'Link coming soon' }) {
  if (!isValidAmazonProductUrl(href)) {
    return <span className={className} aria-disabled="true" title="A valid Amazon product link has not been added yet">{fallback}</span>;
  }

  return <a href={href} target="_blank" rel="noopener noreferrer nofollow sponsored" className={className}>{children}</a>;
}
