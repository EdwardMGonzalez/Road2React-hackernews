import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App, { Search, Button, Table } from "./App";

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

const searchProps = {
  value: "",
  onChange: () => {},
  onSubmit: () => {},
  children: ""
};

describe("Search", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Search {...searchProps}>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<Search {...searchProps}>Potato</Search>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

const buttonProps = {
  onClick: () => {},
  className: "button",
  children: "Check me out!"
};

describe("Button", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button {...buttonProps}>Click Me!</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(
      <Button {...buttonProps}>Click Me!</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

const storyTitle =
  "Algorithm recovers speech from a potato-chip bag filmed through glass (2014)";
const storyUrl =
  "http://news.mit.edu/2014/algorithm-recovers-speech-from-vibrations-0804";
const title = "Potato paradox";
const url = "https://en.wikipedia.org/wiki/Potato_paradox";
const tableProps = {
  list: [
    {
      created_at: "2015-07-15T21:37:09.000Z",
      title: title,
      url: url,
      author: "Panoramix",
      points: 559,
      story_text: null,
      story_title: null,
      story_url: null,
      objectID: "9894237"
    },
    {
      created_at: "2018-08-05T17:40:44.000Z",
      title: null,
      url: null,
      author: "MrJagil",
      points: 327,
      story_text: null,
      story_title: storyTitle,
      story_url: storyUrl,
      objectID: "17692447"
    }
  ],
  onDismiss: () => {}
};

describe("Table", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Table {...tableProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<Table {...tableProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("shows two items in list", () => {
    const element = shallow(<Table {...tableProps} />);
    expect(element.find(".table-row").length).toBe(2);
  });

  it("uses objectID for row Ids", () => {
    const element = shallow(<Table {...tableProps} />);
    expect(element.find("#row-17692447").length).toBe(1);
    expect(element.find("#row-9894237").length).toBe(1);
  });

  it("shows title based on item.story_title and uses item.story_url", () => {
    const element = shallow(<Table {...tableProps} />);
    const row = element.find("#row-17692447");
    expect(
      row.containsMatchingElement(<a href={storyUrl}>{storyTitle}</a>)
    ).toEqual(true);
  });

  it("shows title based on item.title and uses item.url", () => {
    const element = shallow(<Table {...tableProps} />);
    const row = element.find("#row-9894237");
    expect(row.containsMatchingElement(<a href={url}>{title}</a>)).toEqual(
      true
    );
  });
});
