import {useState} from 'react';

function useGetFilters() {

  const [filters, setFilters] = useState([])

  const Group = {
    CATEGORY: "category",
    TAG: "tag"
  }

  function filterExists(name, group) {
      return (
          filters.find((f) => f.name === name && f.group === group) !== undefined
      );
    }
    
    function addFilter(name, group, fnc) {
      setFilters((currentFilters) => [...currentFilters, { name, group, fnc }]);
    }
    
    function removeFilter(name, group) {
      setFilters((currentFilters) =>
          currentFilters.filter((f) => !(f.name === name && f.group === group))
      );
    }
    
    function toggleFilter(name, group, fnc) {
      if (filterExists(name, group)) {
          removeFilter.apply(null, arguments);
      } else {
          addFilter.apply(null, arguments);
      }
    }

    return {setFilters, filterExists, toggleFilter, filters, Group}
}

export default useGetFilters;
