export const getPages = (node) => {
  if(node.Pages) {
    const pages = [];

    node.Pages.forEach((page) => {
      const pageInnerPages = getPages(page);
      pages.push(...pageInnerPages);
    });

    return pages;
  }

  return node;
}
