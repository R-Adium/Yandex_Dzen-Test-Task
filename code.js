/*
 * [getRandomInt description]
 * @param  {[type]} min [description]
 * @param  {[type]} max [description]
 * @return {[type]}     [description]
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

/*
 * [fill_matrix description]
 * @param  {[type]} raws [description]
 * @param  {[type]} cols [description]
 * @return {[type]}      [description]
 */
function fill_matrix(raws, cols) {
  let matrix = [];
  for (let i = 0; i < raws; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = getRandomInt(0, 2);
    }
  } 
  return matrix;
}

/*
 * [isNumeric description]
 * @param  {[type]}  n [description]
 * @return {Boolean}   [description]
 */
function isNumeric(n){   
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/*
 * [throw_current_arr description]
 * @return {[type]} [description]
 */
let from_file = process.argv[2]; //аргумент из командной строки
let r = 0;
let c = 0;
function throw_current_arr() {
  let arr = [];
  let throw_arr = [];
  const readline = require('readline-sync'); 
  const fs = require("fs");
  if (from_file == 'f') { 
    let data = fs.readFileSync(readline.question("Please, enter file name: "), "utf8"); //данные из файла
    let raws = data.split('\n').length; //количество строк в матрице из файла

    for (let i = 0; i < data.length; i++){
      arr[i] = data[i];
    }

    for (let i = 0; i < arr.length; i++) {
      if (!isNumeric(arr[i])) {
        arr.splice(i, 1); //удаляем элементы не цифры
      }
      if (arr[i] == '\n') {
        arr.splice(i, 1); //удаляем символ переноса строки
      }
    }

    let cols = arr.length/raws; //количество столбцов в матрице из файла

    for (let i = 0; i < raws; i++) {
      throw_arr[i] = [];
    }
    for (let i = 0; i < raws; i++) {
      for (let j = 0; j < cols; j++) {
        throw_arr[i][j] = parseInt(arr[i * cols + j]); //строки в числа
      }
    }

    r = raws;
    c = cols;

    return throw_arr; //массив из 0 и 1 из файла
  } else {
    let M = getRandomInt(3, 10); //строки (параметры от минимального значения до максимального не включая)
    let N = getRandomInt(3, 10); //столбцы

    r = M; 
    c = N;
    
    return (throw_arr = fill_matrix(M, N)); //рандомный массив из 0 и 1 
  }   
}

/**
 * [new_condition description]
 * @return {[type]} [description]
 */
let current_matrix = throw_current_arr();
let copy_matrix = [];
function new_condition() {
	
  for (let i = 0; i < r; i++) {
    copy_matrix[i] = [];
    for (let j = 0; j < c; j++) {
      copy_matrix[i][j] = current_matrix[i][j];
    }
  }
  let counter = 0;
  console.clear(); //очистка консоли
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if ((i - 1 >= 0) && (i - 1 <= r - 1) &&   //если левый верхний элемент равен 1
         (j - 1 >= 0) && (j - 1 <= c - 1) && 
         (copy_matrix[i - 1][j - 1] == 1)) {
        counter++;
      } 

      if ((i - 1 >= 0) && (i - 1 <= r - 1) &&   //если верхний центральный элемент равен 1
         (j >= 0) && (j <= c - 1) && 
         (copy_matrix[i - 1][j] == 1)) {
        counter++;
      }

      if ((i - 1 >= 0) && (i - 1 <= r - 1) &&   //если верхний правый равен 1
         (j + 1 >= 0) && (j + 1 <= c - 1) && 
         (copy_matrix[i - 1][j + 1] == 1)) {
        counter++;
      }

      if ((i >= 0) && (i <= r - 1) &&           //если левый элемент равен 1
         (j - 1 >= 0) && (j - 1 <= c - 1) && 
         (copy_matrix[i][j - 1] == 1)) {
        counter++;
      }

      if ((i >= 0) && (i <= r - 1) &&           //если правый элемент равен 1
         (j + 1 >= 0) && (j + 1 <= c - 1) && 
         (copy_matrix[i][j + 1] == 1)) {
        counter++;
      }

      if ((i + 1 >= 0) && (i + 1 <= r - 1) &&   //если нижний левый элемент равен 1
         (j - 1 >= 0) && (j - 1 <= c - 1) && 
         (copy_matrix[i + 1][j - 1] == 1)) {
        counter++;
      }

      if ((i + 1 >= 0) && (i + 1 <= r - 1) &&   //если нижний центральный элемент равен 1
         (j >= 0) && (j <= c - 1) && 
         (copy_matrix[i + 1][j] == 1)) {
        counter++;
      }

      if ((i + 1 >= 0) && (i + 1 <= r - 1) &&   //если нижний правый элемент равен 1
         (j + 1 >= 0) && (j + 1 <= c - 1) && 
         (copy_matrix[i + 1][j + 1] == 1)) {
        counter++;
      }

      if ((current_matrix[i][j] == 0) && (counter == 3)) {
         current_matrix[i][j] = 1;
      }

      if ((current_matrix[i][j] == 1) && ((counter < 2) || (counter > 3))) {
         current_matrix[i][j] = 0;
      }
      counter = 0;
    }
  }
  for (let i = 0; i < current_matrix.length; i++) { //вывод поля 
     console.log(...current_matrix[i]);
  }
}

for (let i = 0; i < current_matrix.length; i++) { //вывод поля 
   console.log(...current_matrix[i]);
}


setTimeout(function run() {
	new_condition(); //меняем состояние нашей функции каждую секунду (1000)
	let flag = true;
	for (let i = 0; i < r; i++) {
		for (let j = 0; j < c; j++) {
			if (copy_matrix[i][j] != current_matrix[i][j]) {
				flag = false;
			}
		}
	}
	if (flag) return;
		setTimeout(run, 1000);
}, 1000);

