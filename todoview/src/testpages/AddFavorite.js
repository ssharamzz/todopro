import React from 'react';

export default function AddFavorite() {
    const students = [
        {name:'이수만', age:'60', address:'인천'},
        {name:'유희열', age:'45', address:'서울'},
        {name:'방시혁', age:'43', address:'부산'},
        {name:'박진영', age:'34', address:'광주'}
    ]
    return (
        <>
            <div><b>이름 나이 주소</b></div>
            {
              students.map((v)=>{
                  return <>
                  <div>{v.name} {v.age} {v.address}</div>
                  </>
                  
              })
          }
        </>
    )
}