'use strict';
class TableTemplate {
    static fillIn(id, dictionary, columnName) {
        const table = document.getElementById(id);
        const len = table.rows.length;
        let i = 0;
        for(i = 0; i < table.rows[0].cells.length; i++) {
            table.rows[0].cells[i].innerHTML 
                = new Cs142TemplateProcessor(table.rows[0].cells[i].innerHTML).fillIn(dictionary);
        }
        if(columnName === undefined) {
            for(i = 1; i < len; i++) {
                for(let j = 0; j < table.rows[i].cells.length; j++) {
                    table.rows[i].cells[j].innerHTML 
                        = new Cs142TemplateProcessor(table.rows[i].cells[j].innerHTML)
                            .fillIn(dictionary);
                }
            }
            return;
        }
        let col_match = 0;
        for(col_match = 0; col_match < table.rows[0].cells.length; col_match++) {
            if(table.rows[0].cells[col_match].innerHTML === columnName) {
                break;
            }
        }
        if(col_match === len) {
            return;
        }
        
        for(i = 1; i < len; i++) {
            table.rows[i].cells[col_match].innerHTML 
                = new Cs142TemplateProcessor(table.rows[i].cells[col_match].innerHTML)
                    .fillIn(dictionary);
        }

    }

}