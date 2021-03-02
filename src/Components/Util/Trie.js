const prefixTrie = {
    children: {},
    value: null,
    endWord: 0,

    addWord (word) {

        /*
        Starting with the base "value: null" node, the method creates a node for the first letter if it doesn't exist.
        Then it moves to that node using a substring starting with character position 1. When the string is at length 1,
        the node is the next to last letter, and so it assigns endWord to the child represented by that last letter.

        Example: "dog"
        Node: {}, child[0]: d, string: dog endWord = 0;
        Node: {d}, child[0]: o, string: og endWord = 0;
        Node: {o}, child[0]: g, string: g, endWord = 1;
         */
        const addWordHelper = (node, str) => {
            if(!node.children[str[0]]) {
                node.children[str[0]] = {children: {}, value: str[0], endWord: 0};
            }
            if (str.length > 1) {
                addWordHelper(node.children[str[0]], str.slice(1));
            } else if (str.length === 1) {
                node.children[str[0]].endWord = 1;
            }
        }
        addWordHelper(this, word);
    },

    /*
    Examines partial strings, letter by letter, and as long as a node exists for the final letter of the partial
    string, this method will return true.
     */
    isValidPrefix(stringSoFar) {
        const checkPrefix = (node, string) => {
            if(!node.children[string[0]]) {
                return false;
            }
            else if (string.length > 1) {
                return checkPrefix(node.children[string[0]], string.slice(1));
            } else if (string.length === 1) {
                return node.children[string[0]] !== undefined;
            }
        }
        return checkPrefix(this, stringSoFar);
    },

    checkWord(word) {
        const wordChecker = (node, string) => {
            if(!node.children[string[0]]) {
                return false;
            } else if (string.length > 1) {
                return wordChecker(node.children[string[0]], string.slice(1));
            } else if (string.length === 1) {
                return node.children[string[0]].endWord === 1;
            }
        }
        return wordChecker(this, word);
    }
};

export default prefixTrie;