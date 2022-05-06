const getNameOfFile = name => {
    if (name == null){
        return '';
    }
    const ext = name.split('.').pop();
    name = name.split('-');
    name.pop();
    name.push(`.${ext}`);
    return name.join('');
}

export default getNameOfFile;