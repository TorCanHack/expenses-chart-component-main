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

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
-


### What I learned


This is my first time building a bar chart on the web. I was exciteted about it because data vislaulization is a valuable skill every web developer should possess.

To build a chart I used the `<canva>` element in HTML. The canva element is used rendering graphics and animations on the web. Letting HTML do the heavy lifting of graphics and animations helpsimprove performance and scalibiity. 

I added the `<canva>` to the HTML code and give it an id of #myExpenseChart.

````html
<canva id="myExpenseChart"><canva/>
````

A chart makes data more intelligible. A chart is only as good as the data it diplays. In this challenge I have been provided with the data in the form of a json file. It is a bonus point if you can dynamically size the bars using the json file. To acheive this, I will be using the `fetch()` API in javascript.

`Fetch` is a modern interface that allows you to make network requests to servers. It's used to request resources such as files, APIs or web pages over the internet.

So, I will use fetch to retrieve the json data as follows:

````js
fetch('data.json')
.then(response => response.json())
.then(data => {
    createChart(data);

})
````

initally i was confused as to why im fetching a json file and still parsin it as json. It turns out when you request a resource via fetch what you get is a response object which is a raw text. The response object provides several methods to parse this raw text and `.json` is one of these methods. 

After i retrive the raw text and parse is as json using `.json` method. I now have javascript object i can manipulate. Hence,I now use that data to create a chat.

 The `createChat()`is a function that creates a chat with the data provided. 

 Inside  `createChat()` I map the JSON data to the chart's data format so they fit neatly into the X nd Y axis of the chat. 

 ````js 
    // map the Json data to the chart's data format
    const days = data.map(item => item.day);
    const amounts = data.map(item => item.amount);
 ````
 part of the challenge is to See the current day’s bar highlighted in a different colour to the other bars. I create two variables that hold the cyan and red colors. Then I create a variable called `today` that gets what week of the day it is by using the Date().tolocaleString() method.

 In the code below, using the map feature, I created an array for the background property called backgroundColors. the tenery expression states that if an index in the array matches today give the color cyan, otherwise give it a red color.   

````js
const backgroundColors = days.map(day => day === today? currentDayColor : defaultBarColor);
````

The next step is to access the `<canva>`, so that i can create my chart and i access it as follows:

````js
    const ctx = document.getElementById('myExpensesChart').getContext('2d');
````

as I am accessing the `<canva>`element with the id of myExpensesChart, i call the `getContext('2d')` method. This method is called on  the `<cavna>` element to obtain the rendering context and its drawing functions. The context i needed in this instant case is two-dimensional drawing context for my chart.

Now, that i have my rendering context. I can go ahead and create my chart. The code below creates the chart.

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
`new Chart()` creates a  chart using the Chart.js library. `type: 'bar` specifies the type of chart to create, which in this case is the bar chart. `data` contains all the labels and data for the chart.

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

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

I like the thinking behind the fetch API. I would like to experiment and build more with it so that i will have a solid grasp of its inner workings. 



## Acknowledgments

Thank you to the frontend mentor team for this awesome project.
