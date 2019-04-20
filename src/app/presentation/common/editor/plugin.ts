import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export class MenuEditing extends Plugin {
    
    editor;
    constructor(editor) {
        super(editor);
    }

    init() {
        this._defineSchema();
        this._defineConverters();
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'div', {
            inheritAllFrom: '$block',
            allowAttributes: ['id', 'class'],
            isBlock: true,
        }  );

        // schema.register( 'menuHeading', {

        //     allowIn: 'menuItem',

        //     // Allow content which is allowed in blocks (i.e. text with attributes).
        //     inheritAllFrom: '$block'

        // }  );

        //schema.register( 'menuList', {

        //    allowIn: 'menuItem',

        //    // Allow content which is allowed in blocks (i.e. text with attributes).
        //    inheritAllFrom: 'List'

        //}  );

    }

    _defineConverters() {       
        const conversion = this.editor.conversion;
        conversion.elementToElement( {
        model: 'div',
             view: {
                 name: 'div'
             }
        }  );

        //conversion.elementToElement( {
        //    model: 'menuHeading',
        //         view: {
        //             name: 'h3'
        //         }
        //}  );
        //conversion.elementToElement( {
        //    model: 'List',
        //         view: {
        //         name: 'ul',
        //         classes:'list'
        //         }
        //}  );
    }
}
