export const addItemButtonText = "Add item";
export const saveButtonText = "Save";
export const addbuttonText = "Add";
export const declineButtonText = "Decline";
export const getTextForLabel = (value) => {
    let text=""
switch (value) {
    case "edit" : text = "Edit good:";
    break;
    case "enter" : text = "Enter good:";
    break;
    case "category" : text = "Enter category:";
    break;
    
    
}
return text
}