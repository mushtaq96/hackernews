import React, { Component } from 'react'
import { render } from '@testing-library/react'
//import the Apollo dependencies
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

//store the mutation
const POST_MUTATION = gql`
    mutation PostMutation($description: String!,$url:String!){
        post(description:$description, url:$url){
            id
            createdAt
            url
            description
        }
    }
`
    
class CreateLink extends Component{
    state = {
        description:'',
        url:'',
    }


render(){
    const{description,url} = this.state
    return(
        <div>
            <div className="flex flex-column mt3">
                <input
                className="mb2"
                value={description}
                onChange={e=>this.setState({description:e.target.value})}
                type="text"
                placeholder="A description for the link"
                />
                <input 
                className="mb2"
                value={url}
                onChange={e=>this.setState({url:e.target.value})}
                type="text"
                placeholder="url for the link"
                />
            </div>
            <Mutation 
                mutation={POST_MUTATION} 
                variables={{ description, url }}
                onCompleted={()=>this.props.history.push('/')}
            >
                { postMutation => <button onClick={postMutation}>Submit</button> }
            </Mutation>
            

        </div>
        )
    }
}


export default CreateLink