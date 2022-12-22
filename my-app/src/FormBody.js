import styled from "styled-components"

export const Label = styled.label`
width: 105px;
display: inline-block;
`;
export const Input = styled.input`
margin-left: 20px;
`;
export const Textarea = styled.textarea`
margin-left: 20px;
resize: none;
`

export const Wrapper = styled.div`
margin-right: 15px;
`
export const FormBody = ({categoryValue,goodsValue,handleChange, id}) => {

return (
        <Wrapper> 
          <div>
          <Label htmlFor="category">Enter category:</Label>
          <Input type="text" value={categoryValue} id="category" required onChange={handleChange}/>
          </div>
          <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
          <Label htmlFor="goods">Enter goods:</Label>
          <Textarea  value={goodsValue} id="goods" required  onChange={handleChange} minlength="10"/>
          </div>
         
        </Wrapper>
    )
}