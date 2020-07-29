import React from 'react'

const Persons = (props) => {
    const filterPersons = props.persons
                            .filter(person => person.name
                                                    .toLowerCase().includes(props.newFilter
                                                                                    .toLowerCase()))

    return(
        <div>
            {filterPersons.map(person => 
                <p key={person.id}>
                    {person.name} {person.number}
                    <button onClick={()=>props.handleDelete(person.id)}>delete</button>
                    </p>
            )}
        </div>
    )}

export default Persons