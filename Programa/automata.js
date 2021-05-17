function test_regex(nombre, matricula, cadena) {
  nombre = nombre.toLowerCase();
  w  = nombre.split(" ").slice(2).map(c=>c[0]).join("");
  i = matricula;
  m = w.split("").reverse().join("");
  j = nombre.split(" ")[0];
  none_terminals = [
    ["w", w],
    ["i", i],
    ["m", m],
    ["j", j],
  ];

  stack = "z";
  pda = {
    0: {
      e: {
        z: [[1, "Sz", 0]],
      },
    },
    1: {
      e: {
        S: [[1, "iwAmmjj", 0]],
        A: [
          [1, "wAmm", 0],
          [1, "i", 0],
        ],
        z: [[2, "z", 0]],
      },
      i: {
        i: [[1, "e", i.length]],
      },
      w: {
        w: [[1, "e", w.length]],
      },
      m: {
        m: [[1, "e", m.length]],
      },
      j: {
        j: [[1, "e", j.length]],
      },
    },
  };

  function transition_exists(state, char, top) {
    try {
      if (pda[state][char][top]) {
        return true;
      }
    } catch {
      return false;
    }
  }

  function accepting(state, string_, stack) {
    console.log("---");
    console.log(state, string_, stack);
    if (string_ == "" && state == "2" && stack == "z") {
      return true;
    }
    top_stack = stack.charAt(0);
    next_nt = [];
    for (nt of none_terminals) {
      console.log(string_.slice(0, nt[1].length), nt[1]);
      if (string_.slice(0, nt[1].length) == nt[1]) {
        next_nt.push(nt[0]);
      }
    }

    transitions = [];
    if (transition_exists(state, "e", top_stack)) {
      transitions = transitions.concat(pda[state]["e"][top_stack]);
    }
    for (nt of next_nt) {
      if (transition_exists(state, nt[0], top_stack)) {
        transitions = transitions.concat(pda[state][nt[0]][top_stack]);
      }
    }
    for (transition of transitions) {
      let [q, alpha, n] = transition;
      if (alpha != "e") new_stack = alpha + stack.slice(1);
      else {
        new_stack = stack.slice(1);
      }
      if (accepting(q, string_.slice(n), new_stack)) {
        return true;
      }
    }
    return false;
  }
  return accepting(0, cadena, stack);
}

console.log(test_regex("Yozedh Jahday Guerrero Ceja", "0123456", "0123456gcgc0123456cgcgcgcgyozedhyozedh"));