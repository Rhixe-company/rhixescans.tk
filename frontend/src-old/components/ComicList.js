import React from 'react'
import { List, Datagrid, TextField, NumberField, ImageField, DateField, EditButton, DeleteButton } from 'react-admin'

const ComicList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <ImageField source="image" />
        <TextField source="description" />
        <NumberField source="rating" />
        <TextField source="status" />
        <TextField source="author" />
        <TextField source="artist" />
        <DateField source="created" />
        <DateField source="updated" />
        <EditButton basePath="/comics" />
        <DeleteButton basePath="/comics" />
      </Datagrid>
    </List>
  );
}

export default ComicList