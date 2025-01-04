'use strict';
function DatePicker (id, func) {
    this.id = id;
    this.func = func;
}

function FixedDate(year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day;
}


DatePicker.prototype.createTableBody = function(table, year, month){
    table.replaceChild(document.createElement('tbody'), table.getElementsByTagName("tbody")[0]);
    const tbody = table.getElementsByTagName("tbody")[0];
    const date = new Date(year, month, 1);//这个月的第一天
    while(date.getDay() !== 0) {
        date.setDate(date.getDate()-1);
    }
    let row = document.createElement('tr');
    let day = 0;
    while(!((date.getMonth() === month+1 || date.getFullYear() === year+1) 
            && date.getDay() === 0)) {
        day = date.getDay();
        if(day === 0) {
            row = document.createElement('tr');
        }
        const block = document.createElement('td');
        block.innerHTML = date.getDate();
        block.date = new FixedDate(date.getFullYear(), date.getMonth()+1, date.getDate());
        if(date.getMonth() === month) {
            block.className = 'this_month';
            
            block.addEventListener("click", () => {
                this.func(this.id, block.date);
            });
        } else {
            block.className = 'other_month';
        }

        row.appendChild(block);
        if(day === 6) {
            tbody.appendChild(row);
        }
        date.setDate(date.getDate()+1);
    }
};

DatePicker.prototype.render = function(date) {
    const division = document.getElementById(this.id);
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    let year = date.getFullYear();
    let month = date.getMonth();
    table.appendChild(thead);
    table.appendChild(tbody);
    division.appendChild(table);

    const hr1 = document.createElement('tr');
    var thArray = [];
    for(let i = 0; i < 7; i++) {
        thArray.push(document.createElement('th'));
    }
    thArray[0].appendChild(document.createTextNode("Su"));
    thArray[1].appendChild(document.createTextNode("Mo"));
    thArray[2].appendChild(document.createTextNode("Tu"));
    thArray[3].appendChild(document.createTextNode("We"));
    thArray[4].appendChild(document.createTextNode("Th"));
    thArray[5].appendChild(document.createTextNode("Fr"));
    thArray[6].appendChild(document.createTextNode("Sa"));
    for(let j = 0; j < 7; j++) {
        hr1.appendChild(thArray[j]);
    }
    thead.appendChild(hr1);
    const hr0 = document.createElement('tr');
    const title = document.createElement('th');
    const lb = document.createElement('th');
    const rb = document.createElement('th');
    title.innerHTML = date.getFullYear().toString() +"/"+(date.getMonth()+1).toString();
    title.colSpan = "5";
    
    lb.innerHTML = "<";
    lb.addEventListener("click", () => {
        date = new Date(year, month-1, 1);
        year = date.getFullYear();
        month = date.getMonth();
        title.innerHTML = date.getFullYear().toString() +"/"+(date.getMonth()+1).toString();
        this.createTableBody(table, year, month);
    });
    rb.innerHTML = ">";
    rb.addEventListener("click", () => {
        date = new Date(year, month+1, 1);
        year = date.getFullYear();
        month = date.getMonth();
        title.innerHTML = date.getFullYear().toString() +"/"+(date.getMonth()+1).toString();
        this.createTableBody(table, year, month);
    });
    hr0.appendChild(lb);
    hr0.appendChild(title);
    hr0.appendChild(rb);
    hr0.className = 'first_row';
    thead.insertBefore(hr0, hr1);
    this.createTableBody(table, year, month);

};