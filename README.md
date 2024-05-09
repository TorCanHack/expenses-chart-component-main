# Frontend Mentor - Expenses chart component solution

This is a solution to the [Expenses chart component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/expenses-chart-component-e7yJBUdjwt). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Frontend Mentor - Expenses chart component solution](#frontend-mentor---expenses-chart-component-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
  - [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the bar chart and hover over the individual bars to see the correct amounts for each day
- See the current day’s bar highlighted in a different colour to the other bars
- View the optimal layout for the content depending on their device’s screen size
- See hover states for all interactive elements on the page
- **Bonus**: Use the JSON data file provided to dynamically size the bars on the chart

### Screenshot

![](./screenshot.jpg)



### Links

- Solution URL: [Solution URL](https://github.com/TorCanHack/expenses-chart-component-main)
- Live Site URL: [live site URL](https://torcanhack.github.io/expenses-chart-component-main/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
-


### What I learned


This is my first time building a bar chart on the web. I was excited about it because data visualisation is a valuable skill every web developer should possess.

To build a chart I used the `<canva>` element in HTML. The `<canva>` element is used to render graphics and animations on the web. Letting HTML do the heavy lifting of graphics and animations helps improve performance and scalability. 

I added the `<canva>` to the HTML code and gave it an id of myExpenseChart.

````html
<canva id="myExpenseChart"><canva/>
````

A chart makes data more intelligible. A chart is only as good as the data it displays. In this challenge, I have been provided with the data as a JSON file. It is a bonus point if you can dynamically size the bars using the JSON file. To achieve this, I will be using the `fetch()` API in JavaScript.

`Fetch` is a modern interface that allows you to make network requests to servers. It's used to request resources such as files, APIs or web pages over the internet.

So, I will use fetch to retrieve the JSON data as follows:

````js
fetch('data.json')
.then(response => response.json())
.then(data => {
    createChart(data);

})
````

Initially, I was confused as to why I was fetching a JSON file and still parsing it as JSON. It turns out that when you request a resource via `fetch` what you get is a response object, which is a raw text. The response object provides several methods to parse this raw text and `.json` is one of these methods. 

After I retrieve the raw text and parse it as JSON using `.json` method. I now have a JavaScript object I can manipulate. Hence, I now used that data to create a chat.

 The `createChat()`is a function that creates a chat with the data provided. 

 Inside  `createChat()` I map the JSON data to the chart's data format so they fit neatly into the X and Y axis of the chat. 

 ````js 
    // map the JSON data to the chart's data format
    const days = data.map(item => item.day);
    const amounts = data.map(item => item.amount);
 ````
 A part of the challenge is to see the current day’s bar highlighted in a different colour compared to the other bars. I created two variables that hold the cyan  and red colours. Then I create a variable called `today` that gets what week of the day it is by using the `Date().tolocaleString() method.`

 In the code below, using the map feature, I created an array for the background property called backgroundColors. The tenery expression states that if an index in the array matches today give the color cyan, otherwise give it a red color.   

````js
const backgroundColors = days.map(day => day === today? currentDayColor : defaultBarColor);
````

The next step is to access the `<canva>`, so that I can create my chart and I access it as follows:

````js
    const ctx = document.getElementById('myExpensesChart').getContext('2d');
````

As I am accessing the `<canva>` element with the id of myExpensesChart, I call the `getContext('2d')` method. This method is called on the `<cavna>` element to obtain the rendering context and its drawing functions. The context i needed in this instant case is a two-dimensional drawing context for my chart.

Now, that I have my rendering context. I can go ahead and create my chart. The code below creates the chart.

````js
 const myExpensesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [{
                label: 'My Expenses ',
                data: amounts,
                backgroundColor: backgroundColors,
                  borderWidth: 1
                  
            }]
        },...
````
`new Chart()` creates a chart using the Chart.js library. `type: 'bar` specifies the type of chart to create, which in this case is the bar chart. `data` contains all the labels and data for the chart.

Chart.js has a tooltip pluggin that displays information when you hover over it. This pluggin accepts a callback function that enables you to modify the information displayed via the tooltip. 

````js
options: {
            plugins: {
                tooltip: {
                    enabled: true, //Enable toolkits
                    mode: 'index', //show all items in the same index
                    intersect: true, //show tooltips even when not extactly hovering over an item
                    callbacks: {
                        label: function(tooltipItem, data) {
                            // You can access the value of the hovered data point like this:
                            const value = tooltipItem.parsed.y;
                            // And then return the string you want to display in the tooltip:
                            return 'My expenses: $' + value;
                        }
                    }
                }
            },
````

It was interesting building a chart and I look forward to building more charts. 

### Continued development

I like the thinking behind the fetch API. I would like to experiment and build more with it so that I will have a solid grasp of its inner workings. 



## Acknowledgments

Thank you to the frontend mentor team for this awesome project.
