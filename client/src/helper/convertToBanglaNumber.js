function convertToBanglaNumber(englishNumber) {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    const englishDigits = englishNumber.toString().split("");
    let banglaNumber = "";

    for (const digit of englishDigits) {
        if (!isNaN(parseInt(digit, 10))) {
            banglaNumber += banglaDigits[parseInt(digit, 10)];
        } else {
            // Preserve non-numeric characters (e.g., hyphen, period, slash)
            banglaNumber += digit;
        }
    }

    return banglaNumber;
}

export default convertToBanglaNumber 