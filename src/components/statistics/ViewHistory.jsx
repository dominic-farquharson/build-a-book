import React from 'react';

// view edit history
const ViewHistory = (props) => (
    <article className="viewHistory">
        {console.log('books', props.books[props.bookKey])}
        {/* Chapter Title */}
        <h1 className="title">{props.books[props.bookKey]['chapters'][props.chapterKey]['title']} Edit History</h1>
        
        {/* Printing Book Chapter */}
       <ul> {printChapterHistory(props.books[props.bookKey]['chapters'][props.chapterKey])}</ul>
        
        {/* View History Button */} 
        <i 
            className="statsBack fa fa-chevron-circle-left fa-2x" aria-hidden="true" 
            // close button
            onClick={()=> props.viewEditHistory()}
        ></i>
    </article>
);

const printChapterHistory = (chapter)=> {
    // console.log('chapter edit', Object.keys(chapters), 'chapter key', chapterKey);
    // const chapterKeys = Object.keys(chapters);
    const title = chapter.title;
    const chapterHistoryKeys = Object.keys(chapter.content);

    // printing chapter history - input w/ chapter titles
    const chapterHistory = chapterHistoryKeys.map((key, i)=> {
        console.log('chapter data',chapter['content'][key]);     

        /* Hack to make sure chapters print. - have to do this to allow for backwards compatibility with old users of the app - JSON structure was changed  */
        const hasChapterData = chapter['content'][key].hasOwnProperty('content');
        const hasContent = Object.keys(chapter['content'][key]['content']).length > 1;
        
        // printing chapter History
        return (
                <li key={i}>
                    {console.log('chapter', chapter[key])}
                    <p style={ {marginTop: '20px'} }> <span>Characters: {chapter['content'][key]['characters']}  </span></p>
                    <p>Time: {chapter['content'][key]['time'] || '---' }</p>           
                    {/*<p><span>Date:</span> {chapter['content'[key]['characters']]} </p>*/}
                    {/* Printing Chapter Data - Checking if there is chapter data */}
                    <p>{
                        (hasChapterData && !hasContent)?
                            <span> content: { chapter['content'][key]['content']['ops'][0]['insert'] }</span>
                            // allowing for backwards compatibility with or statement - printing if content key is a string (later changed to an object in v2)                            
                            : (hasContent)? <span>{chapter['content'][key]['content']}</span> : 'no content' }
                    </p>         
                </li>
        );
    })

    return chapterHistory;
}


export default ViewHistory;

