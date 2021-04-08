const localList = require('./lang.json').words;
const baseList = require('badwords-list').array;

class Filter {

  /**
   * Filter constructor.
   * @constructor
   * @param {object} options - Filter instance options
   * @param {boolean} options.emptyList - Instantiate filter with no blacklist
   * @param {array} options.list - Instantiate filter with custom list
   * @param {string} options.placeHolder - Character used to replace profane words.
   * @param {string} options.regex - Regular expression used to sanitize words before comparing them to blacklist.
   * @param {string} options.replaceRegex - Regular expression used to replace profane words with placeHolder.
   * @param {string} options.splitRegex - Regular expression used to split a string into words.
   */
  constructor(options = {}) {
    Object.assign(this, {
      list: options.emptyList && [] || Array.prototype.concat.apply(localList, [baseList, options.list || []]),
      exclude: options.exclude || [],
      splitRegex: options.splitRegex || /\b/,
      placeHolder: options.placeHolder || '*',
      regex: options.regex || /[^a-zA-Z0-9|\$|\@]|\^/g,
      replaceRegex: options.replaceRegex || /\w/g
    })
  }

  /**
   * Determine if a string contains profane language.
   * @param {string} string - String to evaluate for profanity.
   */
  isProfane(string) {
    var i;
    // Chinese part
    var length = this.list.length;
    for (i = (length - 1); i >= 0; i--) {
        if (string.indexOf(this.list[i]) > -1) {
            return true;
        }
    }
    // English part
    var words = string.split(" ");
    for (i = 0; i < words.length; i++) {
        var word = words[i].toLowerCase();
        if (this.list.indexOf(word) > -1) {
            return true;
        }
    }
    return false;
  }

  /**
   * Replace a word with placeHolder characters;
   * @param {string} string - String to replace.
   */
  replaceWord(string, target) {
    var t = "", i;
    for(i=0; i < target.length; i++){
        t += this.placeHolder;
    }
    return string.replace(new RegExp(target, 'g'), t);
  }

  cleanWord (word) {
    var t = "", i;
    for(i=0; i < word.length; i++){
        t += this.placeHolder;
    }
    return t;
}
  /**
   * Evaluate a string for profanity and return an edited version.
   * @param {string} string - Sentence to filter.
   */
  clean(string) {
    var i;
    // Chinese part
    if (!/^[a-zA-Z]+$/.test(word))
    {
      var length = this.list.length;
      for (i = 0; i < length; i++) {
          if (string.indexOf(this.list[i]) > -1) {
              string = this.replaceWord(string, this.list[i]);
          }
      }
      return string;
    }
    else{
      // English part
      var words = string.split(" ");
      for (i = 0; i < words.length; i++) {
          var word = words[i].toLowerCase();
          if (this.list.indexOf(word) > -1) {
              words[i] = this.cleanWord(words[i]);
          }
      }
      return words.join(' ');
    }
  }

  /**
   * Add word(s) to blacklist filter / remove words from whitelist filter
   * @param {...string} word - Word(s) to add to blacklist
   */
  addWords() {
    let words = Array.from(arguments);

    this.list.push(...words);

    words
      .map(word => word.toLowerCase())
      .forEach((word) => {
        if (this.exclude.includes(word)) {
          this.exclude.splice(this.exclude.indexOf(word), 1);
        }
      });
  }

  /**
   * Add words to whitelist filter
   * @param {...string} word - Word(s) to add to whitelist.
   */
  removeWords() {
    this.exclude.push(...Array.from(arguments).map(word => word.toLowerCase()));
  }
}

module.exports = Filter;
