import React from 'react';

const ItemCategory = (props) => {
  const {
    items,
    name,
    selectedItems,
    ItemsChecked,
    checkedListAll,
    handleCheckboxClick,
  } = props;

  const getItems = items.map((item) => {
    return item;
  });
  return (
    <div>
      <div>-{name}</div>
      <ul>
        {getItems.map((item) => {
          return (
            <li key={item.id}>
              <Checkbox
                item={item}
                selectedItems={selectedItems}
                isChecked={checkedListAll.includes(item.id)}
                handleCheckboxClick={handleCheckboxClick}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Checkbox = (props) => {
  const { item, isChecked, handleCheckboxClick } = props;
  return (
    <label>
      <input
        type="checkbox"
        value={item.id}
        checked={isChecked}
        onChange={handleCheckboxClick}
      />
      {item.name}
    </label>
  );
};

export { ItemCategory, Checkbox };
