function test_regex(cadena) {
    stack = "z";

    pda = {
        0: {
            "c": {
                "E": [[1, ""]],
            },
            "(": {
                "E": [[0, ")"]],
            },
        },
        1: {
            "c": {
                "E": [[1, ""]],
            },
            "o": {
                "E": [[0, ""]],
            },
            ")": {
                ")": [[2, "e"]],
            },
            "e": {
                "z": [[3, ""]],
            },
        },
        2: {
            "o": {
                "E": [[0, ""]],
            },
            ")": {
                ")": [[2, "e"]],
            },
            "e": {
                "z": [[3, ""]],
            },
        },
    };

    pda = {
        0: {
            e: {
                z: [[1, "Sz", 0]],
            },
        },
        1: {
            e: {
                S: [[1, "cA", 0], [1, "(S)B", 0], [1, "+cA", 0], [1, "-cA", 0]],
                A: [[1, "cA", 0], [1, "oS", 0], [1, "e", 0]],
                B: [[1, "oS", 0], [1, "e", 0]],
                z: [[2, "z", 0]],
            },
            c: {
                c: [[1, "e", 1]],
            },
            o: {
                o: [[1, "e", 1]],
            },
            "+": {
                "+": [[1, "e", 1]],
            },
            "-": {
                "-": [[1, "e", 1]],
            },
            "(": {
                "(": [[1, "e", 1]],
            },
            ")": {
                ")": [[1, "e", 1]],
            },
        },
    };

    function transition_exists(state, char, top) {
        try {
            if (pda[state][char][top]) {
                return true;
            };
        } catch {
            return false;
        }
    }

    function accepting(state, string_, stack) {
        // console.log("---");
        if (string_ == "" && state == "2" && stack == "z") {
            return true;
        }
        top_stack = stack.charAt(0);
        if (string_ == "") n_chr = "";
        else n_chr = string_.slice(0, 1);


        next_t = []

        if(n_chr == ""){
            next_t.push(n_chr)
        }
        else if ("0123456789".indexOf(n_chr) > -1) {
            next_t.push("c")
        }
        else if ("-+/*^".indexOf(n_chr) > -1) {
            next_t.push("o")
        }
        else if ("()".indexOf(n_chr) > -1) {
            next_t.push(n_chr)
        }
        else return false ;

        if ("-+".indexOf(n_chr) > -1) {
            next_t.push(n_chr)
        }


        transitions = [];
        if (transition_exists(state, "e", top_stack)) {
            transitions = transitions.concat(pda[state]["e"][top_stack]);
        }
        for (nt of next_t) {
            if (transition_exists(state, nt, top_stack)) {
                transitions = transitions.concat(pda[state][nt][top_stack]);
            }
        }
        // console.log(transitions, next_t, string_, stack)

        for (transition of transitions) {
            let [q, alpha, n] = transition;
            if (alpha != "e") new_stack = alpha + stack.slice(1);
            else new_stack = stack.slice(1);
            // console.log(q, string_.slice(n), new_stack);
            if (accepting(q, string_.slice(n), new_stack)) {
                return true;
            }
        }
        return false;
    }
    return accepting(0, cadena, stack);
    // return accepting(1, "", "Az");
}

console.log("True")
console.log(test_regex("(123*123)"));
console.log(test_regex("(123*123+(10))"));
console.log(test_regex("(198+3*(10)/2)"));
console.log(test_regex("(+5*+7/5)^(23)-5*(98-4)/(6*7-42)"));
console.log(test_regex("1"))
console.log(test_regex("+1"))
console.log(test_regex("+11"))
console.log(test_regex("1++1"))
console.log(test_regex("-1+-2"))
console.log(test_regex("(((((4)))))"));


console.log("False")
console.log(test_regex("(a123*123)"));
console.log(test_regex("(123*123+(10)"));
console.log(test_regex("(198+3*(10)//2)"));
console.log(test_regex("(+5*+7/5)^/(23)-5*(98-4)/(6*7-42)"));
console.log(test_regex("1-"))
console.log(test_regex("+1+"))
console.log(test_regex("+11   "))
console.log(test_regex("++1++1"))
console.log(test_regex("-1+-2/"))
console.log(test_regex("(((((4))))"));