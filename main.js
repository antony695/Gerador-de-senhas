const numeroSenha = document.querySelector('.parametro-senha__texto');

let tamanhoSenha = 12;

numeroSenha.textContent = tamanhoSenha;


const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';

const numeros = '0123456789';

const simbolos = '!@%*?';


const botoes = document.querySelectorAll(
    '.parametro-senha__botao'
);

const campoSenha = document.querySelector(
    '#campo-senha'
);

const checkbox = document.querySelectorAll(
    '.checkbox'
);

const forcaSenha = document.querySelector(
    '.forca'
);

const valorEntropia = document.querySelector(
    '.entropia'
);

const cursor = document.querySelector(
    '.cursor'
);


/* =========================================================
   BOTÕES DE TAMANHO
   ========================================================= */

botoes[0].onclick = diminuiTamanho;

botoes[1].onclick = aumentaTamanho;


function diminuiTamanho() {

    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }

    numeroSenha.textContent = tamanhoSenha;

    geraSenha();
}


function aumentaTamanho() {

    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }

    numeroSenha.textContent = tamanhoSenha;

    geraSenha();
}


/* =========================================================
   CHECKBOXES
   ========================================================= */

for (let i = 0; i < checkbox.length; i++) {

    checkbox[i].onclick = geraSenha;
}


/* =========================================================
   GERADOR
   ========================================================= */

function geraSenha() {

    let alfabeto = '';


    if (checkbox[0].checked) {
        alfabeto += letrasMaiusculas;
    }


    if (checkbox[1].checked) {
        alfabeto += letrasMinusculas;
    }


    if (checkbox[2].checked) {
        alfabeto += numeros;
    }


    if (checkbox[3].checked) {
        alfabeto += simbolos;
    }


    /*
       Nenhum tipo selecionado.
    */

    if (alfabeto.length === 0) {

        campoSenha.value = 'SELECT OPTIONS';

        valorEntropia.textContent =
            'Escolha pelo menos uma característica.';

        forcaSenha.classList.remove(
            'fraca',
            'media',
            'forte'
        );

        forcaSenha.style.width = '0%';

        return;
    }


    /* =====================================================
       GERAÇÃO DA SENHA
       ===================================================== */

    let senha = '';


    for (let i = 0; i < tamanhoSenha; i++) {

        const numeroAleatorio = Math.floor(
            Math.random() * alfabeto.length
        );

        senha += alfabeto[numeroAleatorio];
    }


    campoSenha.value = senha;


    classificaSenha(alfabeto.length);
}


/* =========================================================
   CLASSIFICAÇÃO
   ========================================================= */

function classificaSenha(tamanhoAlfabeto) {

    const entropia =
        tamanhoSenha * Math.log2(tamanhoAlfabeto);


    forcaSenha.classList.remove(
        'fraca',
        'media',
        'forte'
    );


    if (entropia > 57) {

        forcaSenha.classList.add('forte');

    } else if (entropia > 35) {

        forcaSenha.classList.add('media');

    } else {

        forcaSenha.classList.add('fraca');
    }


    /*
       Estimativa aproximada de tempo.
    */

    const combinacoes = Math.pow(
        2,
        entropia
    );


    const segundos =
        combinacoes / 100000000;


    const dias =
        segundos / 86400;


    if (dias < 1) {

        valorEntropia.textContent =
            'senha extremamente fraca — segurança em risco.';

    } else {

        valorEntropia.textContent =
            Math.floor(dias) +
            ' dias para um computador quebrar sua senha.';
    }
}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

geraSenha();
