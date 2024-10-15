(() => {


    // Use UTF-8 charset.
    // const characterSetElement = document.createElement('meta');
    // characterSetElement.setAttribute('http-equiv', 'Content-Type');
    // characterSetElement.setAttribute('content', "text/html; charset=utf-8");
    // document.head.appendChild(characterSetElement);

    const commentElement = document.createComment(`
           ┓┏
┏┓╋┏┳┓ ┏┓┏┓┃╋
┛┗┗┛┗┗•┗┫┗┛┗┛
        ┛ 
Source code: https://github.com/byxor/ntm.golf
`);
    document.documentElement.insertBefore(commentElement, document.head);
})();
