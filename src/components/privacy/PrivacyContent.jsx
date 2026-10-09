import { Link } from 'react-router-dom';

const sections = [
  { id: 'information', label: 'Information involved' },
  { id: 'use', label: 'How it is used' },
  { id: 'cookies', label: 'Cookies and analytics' },
  { id: 'third-parties', label: 'Third-party services' },
  { id: 'choices', label: 'Your choices' },
  { id: 'contact', label: 'Privacy contact' },
];

const PrivacyContent = () => (
  <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 px-4 pb-20 sm:px-6 md:grid-cols-12 lg:px-8">
    <nav aria-label="Privacy policy sections" className="md:sticky md:top-24 md:col-span-3">
      <ul className="flex flex-wrap gap-2 md:flex-col md:gap-1">
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="block rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black md:border-transparent">
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>

    <article className="max-w-3xl space-y-10 text-sm leading-7 text-gray-700 md:col-span-9">
      <p className="rounded-xl border border-[#ebe4d8] bg-[#f8f5ef] p-5">
        This notice describes the site as it currently operates. KitchenTrusted does not offer account registration, a website contact form, or an email newsletter. You may browse without providing contact information; if you choose to email us, the message and your email address are used to respond to your request.
      </p>

      <section id="information" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-bold text-gray-950">Information involved when you use this site</h2>
        <p>You do not need to provide your name, email address, or demographic information to browse KitchenTrusted. If you choose to contact us at <a className="underline underline-offset-2" href="mailto:kitchentrusted.help@outlook.com">kitchentrusted.help@outlook.com</a>, we receive the email address and message you send so we can respond. Please do not include passwords, payment details, or other sensitive information.</p>
        <p>If you use product search, the search phrase is sent to our Supabase catalog service as part of a request to find matching products. Please do not enter sensitive or personal information in search.</p>
        <p>Our site is hosted on Vercel. Like other web hosting services, Vercel may process technical request information to deliver, maintain, and secure the site. See <a className="underline underline-offset-2" href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">Vercel’s Privacy Notice</a> for its handling of that information.</p>
      </section>

      <section id="use" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-bold text-gray-950">How information is used</h2>
        <p>Search phrases are used to return matching catalog results. Technical request information handled by our hosting and database providers supports delivery, reliability, and security of their services.</p>
        <p>The site currently has no visitor account system, advertising pixel, newsletter signup, or integrated audience analytics. We do not use search phrases to build visitor profiles or personalize advertising.</p>
      </section>

      <section id="cookies" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-bold text-gray-950">Cookies and analytics</h2>
        <p>The current site code does not integrate an analytics or advertising tracker and does not intentionally set first-party analytics or advertising cookies. In a local browser check on October 6, 2026, opening the site created no first-party cookies or browser-storage entries. Hosting or browser behavior can differ in production, and this statement will be revisited if site features change.</p>
        <p>When you follow an Amazon affiliate link, Amazon may receive referral information and use cookies or similar technologies on its own services. Amazon’s practices are governed by its <a className="underline underline-offset-2" href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ" target="_blank" rel="noreferrer">Privacy Notice</a>. You can review Amazon’s <a className="underline underline-offset-2" href="https://www.amazon.com/cookies" target="_blank" rel="noreferrer">Cookies Notice</a> and <a className="underline underline-offset-2" href="https://www.amazon.com/privacyprefs" target="_blank" rel="noreferrer">advertising privacy choices</a>.</p>
      </section>

      <section id="third-parties" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-bold text-gray-950">Third-party services and links</h2>
        <p>Supabase provides the database used to retrieve public catalog content such as categories, products, guides, collections, and kitchen-design inspiration. Its <a className="underline underline-offset-2" href="https://supabase.com/privacy" target="_blank" rel="noreferrer">Privacy Notice</a> describes its own services; its processing of customer data is addressed separately from that notice.</p>
        <p>Some product links may take you to Amazon or another third-party website. Those sites have their own privacy practices. Amazon may associate a visit with an affiliate referral when you follow a tagged link. KitchenTrusted does not control what a third party collects after you leave this site.</p>
        <p>KitchenTrusted participates in the Amazon Associates Program. As an Amazon Associate I earn from qualifying purchases. More detail is available in our <Link className="underline underline-offset-2" to="/affiliate-disclosure">Affiliate Disclosure</Link>.</p>
      </section>

      <section id="choices" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-bold text-gray-950">Your choices</h2>
        <p>You can browse without creating an account. You can choose not to use product search or follow external links. Once you leave KitchenTrusted, review the relevant third party’s privacy controls and notices directly.</p>
        <p>Privacy rights depend on where you live and the circumstances of processing. This notice does not promise a particular statutory right or response deadline for every visitor.</p>
      </section>

      <section id="contact" className="scroll-mt-24 space-y-3">
        <h2 className="text-2xl font-bold text-gray-950">Privacy questions</h2>
        <p>For privacy questions about KitchenTrusted, email <a className="underline underline-offset-2" href="mailto:kitchentrusted.help@outlook.com">kitchentrusted.help@outlook.com</a>. Messages are delivered through Microsoft Outlook; see the <a className="underline underline-offset-2" href="https://www.microsoft.com/en-us/privacy/privacystatement" target="_blank" rel="noreferrer">Microsoft Privacy Statement</a> for information about Microsoft’s handling of Outlook data. The site operator’s legal identity and jurisdiction-specific details still need to be confirmed.</p>
      </section>
    </article>
  </div>
);

export default PrivacyContent;
