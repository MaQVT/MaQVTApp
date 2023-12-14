export function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var valueA = a[key].toUpperCase(); // convert to uppercase to make the comparison case-insensitive
        var valueB = b[key].toUpperCase();

        if (valueA < valueB) {
            return -1;
        }
        if (valueA > valueB) {
            return 1;
        }
        return 0;
    });
}