import { useEffect } from 'react';

const setMetaContent = (selector, attribute, content) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    if (selector.includes('property=')) element.setAttribute('property', attribute);
    else element.setAttribute('name', attribute);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

export default function PageMeta({ title, description, robots }) {
  useEffect(() => {
    const previousTitle = document.title;
    const descriptionElement = document.head.querySelector('meta[name="description"]');
    const previousDescription = descriptionElement?.getAttribute('content');
    const ogTitleElement = document.head.querySelector('meta[property="og:title"]');
    const previousOgTitle = ogTitleElement?.getAttribute('content');
    const ogDescriptionElement = document.head.querySelector('meta[property="og:description"]');
    const previousOgDescription = ogDescriptionElement?.getAttribute('content');
    const robotsElement = robots ? document.head.querySelector('meta[name="robots"]') : null;
    const previousRobots = robotsElement?.getAttribute('content');

    document.title = title;
    setMetaContent('meta[name="description"]', 'description', description);
    setMetaContent('meta[property="og:title"]', 'og:title', title);
    setMetaContent('meta[property="og:description"]', 'og:description', description);
    if (robots) setMetaContent('meta[name="robots"]', 'robots', robots);

    return () => {
      document.title = previousTitle;
      if (previousDescription === null || previousDescription === undefined) document.head.querySelector('meta[name="description"]')?.remove();
      else descriptionElement?.setAttribute('content', previousDescription);
      if (previousOgTitle === null || previousOgTitle === undefined) document.head.querySelector('meta[property="og:title"]')?.remove();
      else ogTitleElement?.setAttribute('content', previousOgTitle);
      if (previousOgDescription === null || previousOgDescription === undefined) document.head.querySelector('meta[property="og:description"]')?.remove();
      else ogDescriptionElement?.setAttribute('content', previousOgDescription);
      if (robots) {
        if (previousRobots === null || previousRobots === undefined) document.head.querySelector('meta[name="robots"]')?.remove();
        else robotsElement?.setAttribute('content', previousRobots);
      }
    };
  }, [title, description, robots]);

  return null;
}
