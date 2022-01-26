import React from 'react'

function History({list, downloadAgain}) {
    return (
        <div className='search-history'>
            <h4>Arama Geçmişi</h4>
                <ul>
                    {list.map((item,key) => (
                        <li key={key} onClick={e => downloadAgain(item.url)}>
                            {item.title}
                        </li>
                    ))}
                </ul>
        </div>
    )
}

export default History
