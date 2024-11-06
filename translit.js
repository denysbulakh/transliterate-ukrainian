/**
 * Transliterates Ukrainian text to Latin characters using KMU standard
 */

const UkrainianKMU = {
    // Main transliteration table
    mainTable: {
      'а': 'a',
      'б': 'b', 
      'в': 'v',
      'г': 'h',
      'ґ': 'g',
      'д': 'd',
      'е': 'e',
      'є': 'ie',
      'ж': 'zh',
      'з': 'z',
      'и': 'y',
      'і': 'i',
      'ї': 'i',
      'й': 'i',
      'к': 'k',
      'л': 'l',
      'м': 'm',
      'н': 'n',
      'о': 'o',
      'п': 'p',
      'р': 'r',
      'с': 's',
      'т': 't',
      'у': 'u',
      'ф': 'f',
      'х': 'kh',
      'ц': 'ts',
      'ч': 'ch',
      'ш': 'sh',
      'щ': 'shch',
      'ю': 'iu',
      'я': 'ia'
    },
  
    // Characters to delete
    deleteChars: ['ь', 'Ь', '\u0027', '\u2019', '\u02BC'],
  
    // Special cases
    specialCases: {
      'зг': 'zgh',
      'ЗГ': 'ZGH',
      'Зг': 'Zgh'
    },
  
    // First characters
    firstChars: {
      'є': 'ye',
      'Є': 'Ye',
      'ї': 'yi',
      'Ї': 'Yi',
      'й': 'y',
      'Й': 'Y',
      'ю': 'yu',
      'Ю': 'Yu',
      'я': 'ya',
      'Я': 'Ya'
    }
  };

function translit(text) {
    // Convert text to UTF-8 if not already
    if (typeof text !== 'string') {
        text = text.toString();
    }
    text = decodeURIComponent(encodeURIComponent(text));

    // First delete specified characters
    for (const char of UkrainianKMU.deleteChars) {
        text = text.replaceAll(char, '');
    }

    // Handle special cases
    for (const [key, value] of Object.entries(UkrainianKMU.specialCases)) {
        text = text.replaceAll(key, value);
    }

    // Handle first characters of words
    for (const [key, value] of Object.entries(UkrainianKMU.firstChars)) {
        text = text.replace(new RegExp(`(^|\\s)${key}`, 'g'), `$1${value}`);
    }

    // Process remaining characters using main table
    for (const [key, value] of Object.entries(UkrainianKMU.mainTable)) {
        // Create regex to match both lowercase and uppercase
        const upperKey = key.toUpperCase();
        const upperValue = value.charAt(0).toUpperCase() + value.slice(1);
        text = text.replaceAll(upperKey, upperValue);
        text = text.replaceAll(key, value);
    }

    return text;
}
