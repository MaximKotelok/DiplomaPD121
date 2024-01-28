import React, { Component } from 'react';
import { splitByClass, getTagContentFromString, wrapTagIntoDiv } from '../../../../../utils/Functions';
import { Link, Element } from 'react-scroll';
import DescriptionItemComponent from './DescriptionItemComponent/DescriptionItemComponent';

export function Description({ children, separeteBy }) {


    if(!separeteBy)
        return <div>{children}</div>;

    const html = wrapTagIntoDiv(children, separeteBy, "description-item");

    const subContent = splitByClass(html, "description-item");
    const contentsOfB = getTagContentFromString(html, separeteBy);

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
                <DescriptionItemComponent id={ids[index].id} number={index+1} title={ids[index].name} isActive={false}  >
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                </DescriptionItemComponent>                
            )
            )
            }
            
        </div>
    );

}

/*
<Element key={ids[index].id}  name={ids[index].id}>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </Element>
                */
