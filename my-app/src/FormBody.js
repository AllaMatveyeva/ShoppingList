import styled from "styled-components"
import { CloseIconMui } from "./Modal";

export const Label = styled.label`
width: 105px;
display: inline-block;
`;
export const Input = styled.input`
margin-left: 20px;
width: ${props => props.size?"50px":"100px"};
`;

export const Textarea = styled.textarea`
margin-left: 20px;
resize: none;
`
export const CloseIconAddition = styled(CloseIconMui)`
align-self: flex-start;
`;
export const Wrapper = styled.div`
margin-right: 15px;
`
export const FormBody = ({categoryValue,goodsValue,handleChange, itemsAddition,handleRemove,handleCategoryChange, id}) => {

 
return (
        <Wrapper> 
          <div>
          <Label htmlFor="category" >Enter category:</Label>
          <Input type="text" value={categoryValue} placeholder="category" id="category" required onChange={handleCategoryChange()}/>
          </div>
          {Array.from(itemsAddition).map((item) => (
          <div  key={item} 
          style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
          <Label htmlFor="name">Enter goods:</Label>
          <Input type="text" width={100} value={goodsValue.name} id="name" placeholder="name" required onChange={handleChange(item)}/>
          <Input type="number"  id="number" placeholder="number" size={50} onChange={handleChange(item)}/>
          <Input type="file" id="image" placeholder="image" onChange={handleChange(item)}/>
          {itemsAddition.size > 1 &&
        <CloseIconAddition onClick= {() => handleRemove (item)}/>
}
          </div>
))}
        </Wrapper>
    )
}