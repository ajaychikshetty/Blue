export const userColumns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'Name', headerName: 'User', width: 200, renderCell: (params)=>{
        return(
            <span>{params.row.Name}</span>
        )
    }},
    { field: 'Aadhar_Number', headerName: 'Aadhar', width: 150 },
    {
        field: "Age",
        headerName: "Age",
        width: 70,
    },
    
      {
        field: "Address",
        headerName: "Address",
        width: 150,
      },
    // { field: 'status', headerName: 'STATUS', width: 100, renderCell: (params)=>{
    //     return(
    //         <div className={`cellWithStatus ${params.row.status}`}>
    //             {params.row.status}
    //         </div>
    //     )
    // }},
];

//temporary data
export const userRows = [
    {
        id:1,
        aadhar: 993892797090,
        username:'vidhijain',
        status: 'Approved',
    },
    {
        id:2,
        aadhar: 993892797090,
        username:'asmijain',
        status: 'Pending',
    },
    {
        id:3,
        aadhar: 993892797090,
        username:'riya_gupta',
        status: 'Passive',
    },
    {
        id:4,
        aadhar: 993892797090,
        username:'anchal_tiwari',
        status: 'Approved',
    },
    {
        id:5,
        aadhar: 993892797090,
        username:'ramesh_tiwari',
        status: 'Approved',
    },
];