export const editorConfig = {
  // toolbar: [
  //   [ 'Source', '-', 'Bold', 'Italic', 'Underline', 'Strike' ]
  // ],
  toolbarGroups: [
    { name: 'styles', groups: [ 'styles' ] },
    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
    { name: 'colors', groups: [ 'colors' ] },
    { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align' ] },
    { name: 'links', groups: [ 'links' ] },
    { name: 'insert', groups: [ 'insert' ] },
    // { name: 'document', groups: [ 'mode' ] },
  ],
  removeButtons: 'Language,CreateDiv,Smiley,SpecialChar,PageBreak,Iframe,FontSize,Font,ShowBlocks,About,Styles,Flash',
  allowedContent: true,
}