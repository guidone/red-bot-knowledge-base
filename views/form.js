import React, { useState, useRef, Fragment } from 'react';
import { Button, Form, FormControl, ButtonToolbar, FormGroup, ControlLabel, HelpBlock, Nav, Toggle } from 'rsuite';

import { Dictionary, Confidence, InputInteger } from '../../../src/components';

const dictionarySchema = [
  {
    name: 'knowledge-base.bestMatch',
    description: 'Text shown before the list of opening hours'
  },
  {
    name: 'knowledge-base.sorryNotFound1',
    description: 'Answer when no support articles were found (first version)'
  },
  {
    name: 'knowledge-base.sorryNotFound2',
    description: 'Answer when no support articles were found (second version)'
  },
  {
    name: 'knowledge-base.sorryNotFound3',
    description: 'Answer when no support articles were found (third version)'
  },
  {
    name: 'knowledge-base.askSomething1',
    description: 'What the chatbot answer when the user requests help (first version)'
  },
  {
    name: 'knowledge-base.askSomething2',
    description: 'What the chatbot answer when the user requests help (second version)'
  },
  {
    name: 'knowledge-base.askSomething3',
    description: 'What the chatbot answer when the user requests help (third version)'
  },
  {
    name: 'knowledge-base.no'
  },
  {
    name: 'knowledge-base.yes'
  },
  {
    name: 'knowledge-base.ok'
  },
  {
    name: 'knowledge-base.wasUseful',
    description: 'Asked if an article is useful after a search'
  },
  {
    name: 'knowledge-base.thanksBye1',
    description: 'Answer when the user is satisfied with the found article (first version)'
  },
  {
    name: 'knowledge-base.thanksBye2',
    description: 'Answer when the user is satisfied with the found article (second version)'
  },
  {
    name: 'knowledge-base.thanksBye3',
    description: 'Answer when the user is satisfied with the found article (third version)'
  },
  {
    name: 'knowledge-base.selectOneOfThese',
    description: 'Shown when the user is asked to select on of the related articles of a search'
  },
  {
    name: 'knowledge-base.somethingWentWrong',
    description: 'Shown when an unrecoverable error occurs'
  },
  {
    name: 'knowledge-base.noMoreArticles',
    description: `Shown when user ask to more results but there aren't`
  }
];



export default ({
  value,
  onSubmit = () => { },
  disabled = false
}) => {
  const [formValue, setFormValue] = useState(value);
  const [formError, setFormError] = useState(null);
  const [tab, setTab] = useState('openings');
  const form = useRef(null);

  return (
    <div>
      <Nav appearance="tabs" activeKey={tab} onSelect={setTab} style={{ marginBottom: '25px' }}>
        <Nav.Item eventKey="openings">Knowledge Base</Nav.Item>
        <Nav.Item eventKey="translations">Translations</Nav.Item>
      </Nav>
      <Form
        disabled={true}
        formValue={formValue}
        formError={formError}
        ref={form}
        checkTrigger="none"
        layout="vertical"
        fluid
        onChange={formValue => {
          setFormValue(formValue);
          setFormError(null);
        }}
        onCheck={errors => {
          setFormError(errors);
        }}
      >
        {tab === 'translations' && (
          <Fragment>
            <FormGroup>
              <FormControl
                name="translations"
                accepter={Dictionary}
                schema={dictionarySchema}
                disabled={disabled}
              />
            </FormGroup>
          </Fragment>
        )}
        {tab === 'openings' && (
          <Fragment>
            <FormGroup>
              <ControlLabel>Answer by Default</ControlLabel>
              <FormControl
                name="answerByDefault"
                accepter={Toggle}
                disabled={disabled}
              />
              <HelpBlock>
                With this option <em>enabled</em>, the block execute a search for every input of the user, if <em>disabled</em> the
                user has to enter in the <em>ask question state</em> entering some sentences like <em>"I need help"</em>
              </HelpBlock>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Articles Sensitivity</ControlLabel>
              <FormControl
                disabled={disabled}
                name="threshold"
                accepter={Confidence}
              />
              <HelpBlock>
                The minimum score of an article to be considered relevant. Lower this value if the search doesn't return any value.
              </HelpBlock>
            </FormGroup>
            <FormGroup>
              <ControlLabel>NLP Sensitivity</ControlLabel>
              <FormControl
                disabled={disabled}
                name="nlpThreshold"
                accepter={Confidence}
              />
              <HelpBlock>
                The minimum score of an intent to be considered relevant. Lower this value if the NLP doesn't catch any intent of the user input,
                raise this value if the NLP of this block is interfering with the NLP of other blocks.
              </HelpBlock>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Suggest Articles</ControlLabel>
              <FormControl
                disabled={disabled}
                name="articlesToSuggest"
                accepter={InputInteger}
                min={1}
                max={20}
                style={{ maxWidth: '200px'}}
                postfix={<span> articles</span>}
              />
              <HelpBlock>
                The maximum articles to suggest if user clicks on "More articles"
              </HelpBlock>
            </FormGroup>
          </Fragment>
        )}
        <FormGroup style={{ marginTop: '40px' }}>
          <ButtonToolbar>
            <Button
              disabled={disabled}
              appearance="primary"
              onClick={() => {
                if (!form.current.check()) {
                  return;
                }
                onSubmit(formValue);
              }}>
              Save configuration
              </Button>
            <Button
              disabled={disabled}
              appearance="default"
              onClick={() => {
                if (confirm('Reset configuration?')) {
                  setFormValue(value);
                }
              }}
            >
              Reset
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </div>
  );
};