const useApplyFilters = (bookmarks = [], filters, Group) => {
    
    function isShownByCategory(bookmark, filters) {
        const categoryFilters = filters.filter((filter) => filter.group === Group.CATEGORY);
        if (!categoryFilters.length) return true;
        return categoryFilters.some((filter) => filter.fnc(bookmark));
      }
    
    function isShownByTags(bookmark, filters) {
        const tagsFilters = filters.filter((filter) => filter.group === Group.TAG);
        if (!tagsFilters.length) return true;
        return tagsFilters.every((filter) => filter.fnc(bookmark));
      }

    return bookmarks.filter((bookmark) => {
        const showByCategory = isShownByCategory(bookmark, filters);
        const showByTags = isShownByTags(bookmark, filters);
        return showByCategory && showByTags;
      });
}

export default useApplyFilters
