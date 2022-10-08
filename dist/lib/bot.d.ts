interface ITemplate {
    tags: string[];
    template: string;
}
interface ITemplates {
    id: string;
    content: ITemplate;
}
declare class Bot {
    private request;
    private templates;
    constructor(hookUrl: string);
    private _initTemplates;
    private _genTemplate;
    private _genPrepareTemplace;
    registeTemplate(id: string, template: unknown, forceReplace?: boolean): ITemplates[];
    sendText(text: string): Promise<boolean>;
    sendRichText(id: string, args: string[]): Promise<boolean>;
}
export default Bot;
