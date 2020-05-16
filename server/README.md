# BDU Schedule API


## Installation
```
$ npm i
```
## Usage
### Request
`api/schedule/:studentId`
```
ex: http://localhost:4000/api/schedule/17050050
```
### Response
```
{
    "week": {
        "from": /string,
        "to": /string
    },
    "student": {
        "id": /string,
        "name": /string,
        "dateOfBirth": /string,
        "detail": /string
    },
    "schedule": [
        {
            "class": /string,
            "subjectName": /string,
            "subjectCode": /string,
            "weekDay": /string,
            "room": /string,
            "startSlot": /number,
            "numbersOfSlots": /number,
            "instructor": /string,
            "date": /date
        },
        ...
    ]
}
```
```
ex:
{
    "week": {
        "from": "11/05/2020",
        "to": "17/05/2020"
    },
    "student": {
        "id": "17050050",
        "name": "Nguyễn Chí Tường",
        "dateOfBirth": "Ngày sinh:15/07/99",
        "detail": "20TH01 - Ngành: Công nghệ thông tin - Khoa: Công nghệ thông tin"
    },
    "schedule": [
        {
            "class": "20TH01",
            "subjectName": "Thương mại điện tử",
            "subjectCode": "INF0324 nhóm 02 tổ thực hành 1",
            "weekDay": "Thứ Tư",
            "room": "ONLIN6",
            "startSlot": "1",
            "numbersOfSlots": "5",
            "instructor": "T.H.Duật",
            "date": "2020-05-12T17:00:00.000Z"
        },
        ...
    ]
}
```

