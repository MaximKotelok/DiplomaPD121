import React, { Component } from 'react';
import { splitByClass, getTagContentFromString, wrapTagIntoDiv } from '../utils/Functions';
import { Link, Element } from 'react-scroll';
export function Description({ content }) {

    const html = wrapTagIntoDiv(content, "b", "description-item");
    const subContent = splitByClass(html, "b", "description-item");
    const contentsOfB = getTagContentFromString(html, "b");

    const ids = [];


    for (let i = 0; i < contentsOfB.length; i++) {
        const id = `b_${i}_${contentsOfB[i].replace(/\s+/g, '_')}`;
        ids.push({ id: id, name: contentsOfB[i] });
    }


    return (
        <div>
            <div>
                {
                    ids.map((id, index) => (
                        <div key={index}>

                        <Link to={id.id} spy={true} duration={500}>
                            {id.name}
                        </Link>
                        </div>
                    ))
                }
            </div>

            {subContent.map((content, index) => (
                <Element  key={ids[index].id}  name={ids[index].id}>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </Element>
            )
            )
            }
        </div>
    );

}
