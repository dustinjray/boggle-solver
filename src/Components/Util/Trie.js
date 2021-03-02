const prefixTrie = {
    children: {},
    value: null,
    endWord: 0,

    addWord (word) {

        const addWordHelper = (node, str) => {
            if(!node.children[str[0]]) {
                node.children[str[0]] = {children: {}, value: str[0]};
            }
            if (str.length === 1) {
                node.endWord = 1;
            }
            if (str.length > 1) {
                addWordHelper(node.children[str[0]], str.slice(1));
            }
        }
        addWordHelper(this, word);
    },

    isValidPrefix(stringSoFar) {
        const checkPrefix = (node, string) => {
            // console.log(node);
            if(!node.children[string[0]]) {
                // console.log(`no node for ${string[0]}`);
                return false;
            }
            if (string.length === 1) {
                return node.children[string[0]] !== undefined;
            }
            if (string.length > 1) {
                // console.log("checking next letter");
                return checkPrefix(node.children[string[0]], string.slice(1));
            }
        }
        return checkPrefix(this, stringSoFar.toUpperCase());
    },

    checkWord(word) {
        const wordChecker = (node, string) => {
            if(string.length > 1 && node.children[string[0]]) {
                return wordChecker(node.children[string[0]], string.slice(1));
            } else if (string.length === 1) {
                if (!node.children[string[0]]) {
                    return false;
                } else {
                    if(node.children[string[0]]){
                        return node.children[string[0]].endWord === 1;
                    }
                }
            }
        }
        return wordChecker(this, word.toUpperCase());
    }
};

export default prefixTrie;