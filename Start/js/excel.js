function excelExport(event){
    excelExportCommon(event, handleExcelDataAll);
}

// 엑셀 데이터를 로드하는 함수
function excelExportCommon(event, callback){
    var input = event.target;
    var reader = new FileReader();

    reader.onload = function(){
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type : 'binary'});
        var sheetNameList = wb.SheetNames;                  // 시트 이름 목록 가져오기 
        var firstSheetName = sheetNameList[0];              // 첫번째 시트명
        var firstSheet = wb.Sheets[firstSheetName];         // 첫번째 시트 
        callback(firstSheet);      
    };
    reader.readAsBinaryString(input.files[0]);
}

// 엑셀 데이터를 처리하는 함수
function handleExcelDataAll(sheet){
    handleExcelDataHeader(sheet);   
	handleExcelDataJson(sheet);     
	handleExcelDataCsv(sheet);      
	handleExcelDataHtml(sheet);     
}

// header 정보 
function handleExcelDataHeader(sheet){
    var headers = get_header_row(sheet);
    document.getElementById("displayHeaders").innerText = JSON.stringify(headers);
}

// json 형태
function handleExcelDataJson(sheet){
    document.getElementById("displayExcelJson")
        .innerText = JSON.stringify(XLSX.utils.sheet_to_json (sheet));
}

// csv 형태
function handleExcelDataCsv(sheet){
    document.getElementById("displayExcelCsv").innerText=XLSX.utils.sheet_to_csv (sheet);
}

// html 형태
function handleExcelDataHtml(sheet){
    document.getElementById("displayExcelHtml").innerText=XLSX.utils.sheet_to_html (sheet);
}

// 엑셀의 헤더 정보를 가져오는 함수
function get_header_row(sheet) {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r;                                   // 첫 번째 행을 가져옴

    // 모든 열을 탐색
    for(C = range.s.c; C <= range.e.c; ++C) {
        var cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] // 첫 번째 행의 셀을 가져옴

        var hdr = "UNKNOWN " + C;                            // 셀이 없을 경우 UNKNOWN으로 표시
        if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);

        headers.push(hdr);
    }
    return headers;
}