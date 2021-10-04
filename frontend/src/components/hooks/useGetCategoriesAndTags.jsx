function useGetCategoriesAndTags() {
    
    function compare(a, b) {
        return (a.title.toLowerCase() !== b.title.toLowerCase() ? 
        a.title.toLowerCase() < b.title.toLowerCase() ?
        -1 : 1 : 0);
    }

    function sortCategories(categories) {
      return ([...new Set(categories.map(bookmark => JSON.stringify({"id": bookmark.category.id, "title": bookmark.category.title})))]
      .map(string => JSON.parse(string))
      .sort(compare))};
      
    function sortAllTags(tags) {
      return ([...new Set(tags.map(tag => JSON.stringify({"id": tag.id, "title": tag.title})))]
      .map(string => JSON.parse(string))
      .sort(compare))};

    function sortCategoriesByData(filteredData) {
      return ([...new Set(filteredData
        .map(bookmark => JSON.stringify({"id": bookmark.category.id, "title": bookmark.category.title})))]
        .map(string => JSON.parse(string))
        .sort(compare))};

    function sortTagsByCategory(filteredData) {
      return ([...new Set(filteredData.flatMap(bookmark => bookmark.tags)
        .map(tag => JSON.stringify({"id": tag.id, "title": tag.title})))]
        .map(string => JSON.parse(string))
        .sort(compare))};

    return {sortCategories, sortAllTags, sortTagsByCategory, sortCategoriesByData}
    
}

export default useGetCategoriesAndTags