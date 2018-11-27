export const SET_FLUTTERCOMIC_SEARCHTEXT = 'FLUTTERCOMIC-SET-SEARCHTEXT';
export const CLEAN_FLUTTERCOMIC_SEARCHTEXT = 'FLUTTERCOMIC-CLEAN-SEARCHTEXT';

export function setFlutterComicSearchText(event)
{
    return {
        type      : SET_FLUTTERCOMIC_SEARCHTEXT,
        text      : event.target.value
    }
}

export function cleanFlutterComicSearchText()
{
    return {
        type      : CLEAN_FLUTTERCOMIC_SEARCHTEXT,
    }
}

