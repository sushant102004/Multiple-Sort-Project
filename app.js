const fs = require('fs')

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})


let arr = []
let bubbleTime = 0
let insertionTime = 0
let selectionTime = 0
let mergeTime = 0

class MultiSort {

    generateRandomNumber(num) {
        for (let i = 0; i < num; i++) {
            const randomNumber = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
            arr.push(randomNumber);
        }

        const inputData = arr.join('\n')

        fs.writeFile('input.txt', inputData, (err) => {
            if(err) {
                console.error('Error writing input.')
            }
        })
    }

    async startSorting() {
        
        readline.question('Enter number of items to sort: ', async (num) => {
            await this.generateRandomNumber(num)

            bubbleTime = await bubbleSort(arr)
            insertionTime = await insertionSort(arr)
            selectionTime = await selectionSort(arr)

            const mergeSortStart = performance.now()
            await mergeSort(arr)
            const mergeSortEnd = performance.now()

            mergeTime = mergeSortEnd - mergeSortStart

            this.generateGraph()
            readline.close()
        })
    }

    generateGraph() {
        let graphData = {
            type: 'bar',                            
            data: {
                labels: ['Bubble', 'Insetion', 'Selection', 'Merge'],   
                datasets: [{
                    label: 'Time Taken',                         
                    data: [bubbleTime, insertionTime, selectionTime, mergeTime]           
                }]
            }
        }

        const API = `https://quickchart.io/chart?c=${JSON.stringify(graphData)}`
        console.log(`Graph Generated: ${API}`)
    }
}


function bubbleSort(arr) {
    const length = arr.length;
  
    const startTime = performance.now();
  
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
  
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
  
    return elapsedTime
}


function insertionSort(arr) {
    const length = arr.length;
  
    const startTime = performance.now();
  
    for (let i = 1; i < length; i++) {
        const currentValue = arr[i];
        let j = i - 1;
  
        while (j >= 0 && arr[j] > currentValue) {
            arr[j + 1] = arr[j];
            j--;
        }
  
        arr[j + 1] = currentValue;
    }
  
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    return elapsedTime
}


function selectionSort(arr) {
    const length = arr.length;
  
    const startTime = performance.now();
  
    for (let i = 0; i < length - 1; i++) {
        let minIndex = i;
  
        for (let j = i + 1; j < length; j++) {
            if (arr[j] < arr[minIndex]) {
            minIndex = j;
            }
        }
  
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    return elapsedTime
}


function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
  
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
  
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);
  
    return merge(sortedLeft, sortedRight);
}
  
  function merge(left, right) {
    const merged = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
            merged.push(left[leftIndex]);
            leftIndex++;
        } else {
            merged.push(right[rightIndex]);
            rightIndex++;
        }
    }
  
    while (leftIndex < left.length) {
        merged.push(left[leftIndex]);
        leftIndex++;
    }
  
    while (rightIndex < right.length) {
        merged.push(right[rightIndex]);
        rightIndex++;
    }
  
   return merged;
}



const multiSort = new MultiSort()

multiSort.startSorting()