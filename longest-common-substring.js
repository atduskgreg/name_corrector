// levenshtein with path implementation adopted from here: https://github.com/phiresky/levenshtein-demo

function levenshtein(str1, str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    let m = [], paths = [], l1 = str1.length, l2 = str2.length;
    for (let i = 0; i <= l1; i++) {
        m[i] = [i];
        paths[i] = [[i - 1, 0]];
    }
    for (let j = 0; j <= l2; j++) {
        m[0][j] = j;
        paths[0][j] = [0, j - 1];
    }
    for (let i = 1; i <= l1; i++)
        for (let j = 1; j <= l2; j++) {
            if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                m[i][j] = m[i - 1][j - 1];
                paths[i][j] = [i - 1, j - 1];
            }
            else {
                let min = Math.min(m[i - 1][j], m[i][j - 1], m[i - 1][j - 1]);
                m[i][j] = min + 1;
                if (m[i - 1][j] === min)
                    paths[i][j] = [i - 1, j];
                else if (m[i][j - 1] === min)
                    paths[i][j] = [i, j - 1];
                else if (m[i - 1][j - 1] === min)
                    paths[i][j] = [i - 1, j - 1];
            }
        }
    // one of many possible paths
    let levenpath = [];
    let j = l2;
    for (let i = l1; i >= 0 && j >= 0;)
        for (j = l2; i >= 0 && j >= 0;) {
            levenpath.push({ i, j });
            let t = i;
            i = paths[i][j][0];
            j = paths[t][j][1];
        }
    levenpath = levenpath.reverse();
    for (let i = 0; i < levenpath.length; i++) {
        const last = levenpath[i - 1], cur = levenpath[i];
        if (i !== 0) {
            if (cur.i === last.i + 1 &&
                cur.j === last.j + 1 &&
                m[cur.i][cur.j] !== m[last.i][last.j])
                cur.type = "replace";
            else if (cur.i === last.i && cur.j === last.j + 1)
                cur.type = "insert";
            else if (cur.i === last.i + 1 && cur.j === last.j)
                cur.type = "delete";
        }
    }
    return { matrix: m, levenpath: levenpath };
}

function longestCommonSubstring(string1, string2) {
    // Convert strings to arrays to treat unicode symbols length correctly.
    // For example:
    // '𐌵'.length === 2
    // [...'𐌵'].length === 1
    const s1 = [...string1];
    const s2 = [...string2];
  
    // Init the matrix of all substring lengths to use Dynamic Programming approach.
    const substringMatrix = Array(s2.length + 1).fill(null).map(() => {
      return Array(s1.length + 1).fill(null);
    });
  
    // Fill the first row and first column with zeros to provide initial values.
    for (let columnIndex = 0; columnIndex <= s1.length; columnIndex += 1) {
      substringMatrix[0][columnIndex] = 0;
    }
  
    for (let rowIndex = 0; rowIndex <= s2.length; rowIndex += 1) {
      substringMatrix[rowIndex][0] = 0;
    }
  
    // Build the matrix of all substring lengths to use Dynamic Programming approach.
    let longestSubstringLength = 0;
    let longestSubstringColumn = 0;
    let longestSubstringRow = 0;
  
    for (let rowIndex = 1; rowIndex <= s2.length; rowIndex += 1) {
      for (let columnIndex = 1; columnIndex <= s1.length; columnIndex += 1) {
        if (s1[columnIndex - 1] === s2[rowIndex - 1]) {
          substringMatrix[rowIndex][columnIndex] = substringMatrix[rowIndex - 1][columnIndex - 1] + 1;
        } else {
          substringMatrix[rowIndex][columnIndex] = 0;
        }
  
        // Try to find the biggest length of all common substring lengths
        // and to memorize its last character position (indices)
        if (substringMatrix[rowIndex][columnIndex] > longestSubstringLength) {
          longestSubstringLength = substringMatrix[rowIndex][columnIndex];
          longestSubstringColumn = columnIndex;
          longestSubstringRow = rowIndex;
        }
      }
    }
  
    if (longestSubstringLength === 0) {
      // Longest common substring has not been found.
      return '';
    }
  
    // Detect the longest substring from the matrix.
    let longestSubstring = '';
  
    while (substringMatrix[longestSubstringRow][longestSubstringColumn] > 0) {
      longestSubstring = s1[longestSubstringColumn - 1] + longestSubstring;
      longestSubstringRow -= 1;
      longestSubstringColumn -= 1;
    }
  
    return longestSubstring;
  }