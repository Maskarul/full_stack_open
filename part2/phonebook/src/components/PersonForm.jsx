const PersonForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    Name: <input value={props.newName} onChange={props.handleNewName}/>
                </div>
                <div>
                    Phone Number: <input value={props.newPhoneNumber} onChange={props.handleNewPhoneNumber}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )

}

export default PersonForm