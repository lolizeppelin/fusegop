/* Copy from @fuse/FuseUtils */
const Long = require('long');


class searchUtil {

    static filterArrayByString(mainArr, searchText)
    {
        if ( searchText === '' )
        {
            return mainArr;
        }

        searchText = searchText.toLowerCase();

        return mainArr.filter(itemObj => {
            return this.searchInObj(itemObj, searchText);
        });
    };

    static searchInObj(itemObj, searchText)
    {
        for ( const prop in itemObj )
        {

            if ( !itemObj.hasOwnProperty(prop) )
            {
                continue;
            }

            const value = itemObj[prop];

            if ( typeof value === 'string' )
            {
                if ( this.searchInString(value, searchText) )
                {
                    return true;
                }
            }

            if ( typeof value === 'number' )
            {
                if ( this.searchInString(value.toString(), searchText) )
                {
                    return true;
                }
            }

            else if ( Array.isArray(value) )
            {
                if ( this.searchInArray(value, searchText) )
                {
                    return true;
                }
            }

            if ( typeof value === 'object' )
            {
                if (Long.isLong(value)) {
                    if ( this.searchInString(value.toString(), searchText) )
                    {
                        return true;
                    }
                }

                else if ( this.searchInObj(value, searchText) )
                {
                    return true;
                }
            }
        }
    }

    static searchInArray(arr, searchText)
    {
        for ( const value of arr )
        {
            if ( typeof value === 'string' )
            {
                if ( this.searchInString(value, searchText) )
                {
                    return true;
                }
            }

            if ( typeof value === 'object' )
            {
                if ( this.searchInObj(value, searchText) )
                {
                    return true;
                }
            }
        }
    }

    static searchInString(value, searchText)
    {
        return value.toLowerCase().includes(searchText);
    }


}


export default searchUtil;
