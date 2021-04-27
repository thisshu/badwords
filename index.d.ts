export default Filter;
declare class Filter {
    /**
     * Filter constructor.
     * @constructor
     * @param {object} options - Filter instance options
     * @param {boolean} options.emptyList - Instantiate filter with no blacklist
     * @param {array} options.list - Instantiate filter with custom list
     * @param {array} options.exclude - Add words to whitelist filter
     * @param {string} options.placeHolder - Character used to replace profane words.
     * @param {RegExp} options.regex - Regular expression used to sanitize words before comparing them to blacklist.
     * @param {RegExp} options.replaceRegex - Regular expression used to replace profane words with placeHolder.
     * @param {RegExp} options.splitRegex - Regular expression used to split a string into words.
     */
    constructor(options?: {
        emptyList?: boolean;
        list?: any;
        exclude?: string[];
        placeHolder?: string;
        regex?: RegExp;
        replaceRegex?: RegExp;
        splitRegex?: RegExp;
    });
    /**
     * Determine if a string contains profane language.
     * @param {string} string - String to evaluate for profanity.
     */
    isProfane(string: string): boolean;
    /**
     * Replace a word with placeHolder characters;
     * @param {string} string - String to replace.
     */
    replaceWord(string: string, target: any): string;
    cleanWord(word: any): string;
    /**
     * Evaluate a string for profanity and return an edited version.
     * @param {string} string - Sentence to filter.
     */
    clean(string: string): string;
    /**
     * Add word(s) to blacklist filter / remove words from whitelist filter
     * @param {...string} word - Word(s) to add to blacklist
     */
    addWords(...args: string[]): void;
    /**
     * Add words to whitelist filter
     * @param {...string} word - Word(s) to add to whitelist.
     */
    removeWords(...args: string[]): void;
}
