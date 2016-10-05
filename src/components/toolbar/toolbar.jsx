import React, {PropTypes} from 'react';
import IconNewFile from 'react-icons/lib/fa/file-o';
import IconSave from 'react-icons/lib/fa/floppy-o';
import IconLoad from 'react-icons/lib/fa/folder-open-o';
import IconZoomPlus from 'react-icons/lib/ti/zoom-in';
import IconZoomMinus from 'react-icons/lib/ti/zoom-out';
import IconPan from 'react-icons/lib/fa/hand-paper-o';
import IconPointer from 'react-icons/lib/fa/mouse-pointer';
import Icon3D from 'react-icons/lib/fa/cube';
import Icon3DFirstPerson from 'react-icons/lib/fa/eye';
import IconAddImage from 'react-icons/lib/fa/image';
import IconCatalog from 'react-icons/lib/fa/plus-circle';


import {
  MODE_IDLE,
  MODE_2D_PAN,
  MODE_2D_ZOOM_IN,
  MODE_2D_ZOOM_OUT,
  MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE,
  MODE_DRAWING_LINE,
  MODE_DRAWING_HOLE,
  MODE_DRAWING_ITEM,
  MODE_FITTING_IMAGE,
  MODE_UPLOADING_IMAGE,
  MODE_VIEWING_CATALOG
} from '../../constants';

import ToolbarButton from './toolbar-button.jsx';
const STYLE = {backgroundColor: '#28292D', padding: "10px 10px"};

export default function Toolbar({state, width, height, toolbarButtons}, {
  projectActions,
  viewer2DActions,
  editingActions,
  viewer3DActions,
  linesActions,
  holesActions,
  imagesActions,
  itemsActions,
}) {

  let mode = state.get('mode');

  return (
    <aside style={{...STYLE, width, height}}>
      <ToolbarButton tooltip="New project" onClick={event => projectActions.newProject()}>
        <IconNewFile />
      </ToolbarButton>

      <ToolbarButton tooltip="Save project" onClick={event => projectActions.saveProjectToFile()}>
        <IconSave />
      </ToolbarButton>

      <ToolbarButton tooltip="Load project" onClick={event => projectActions.loadProjectFromFile()}>
        <IconLoad />
      </ToolbarButton>

      <ToolbarButton active={[MODE_3D_VIEW].includes(mode)} tooltip="3D View"
                     onClick={event => viewer3DActions.selectTool3DView()}>
        <Icon3D />
      </ToolbarButton>

      <ToolbarButton active={[MODE_3D_FIRST_PERSON].includes(mode)} tooltip="3D First Person"
                     onClick={event => viewer3DActions.selectTool3DFirstPerson()}>
        <Icon3DFirstPerson />
      </ToolbarButton>

      <ToolbarButton active={[MODE_IDLE].includes(mode)} tooltip="Select elements"
                     onClick={event => editingActions.selectToolEdit()}>
        <IconPointer />
      </ToolbarButton>

      <ToolbarButton active={[MODE_2D_ZOOM_IN].includes(mode)} tooltip="Zoom in"
                     onClick={event => viewer2DActions.selectToolZoomIn()}>
        <IconZoomPlus />
      </ToolbarButton>

      <ToolbarButton active={[MODE_2D_ZOOM_OUT].includes(mode)} tooltip="Zoom out"
                     onClick={event => viewer2DActions.selectToolZoomOut()}>
        <IconZoomMinus />
      </ToolbarButton>

      <ToolbarButton active={[MODE_2D_PAN].includes(mode)} tooltip="Pan"
                     onClick={event => viewer2DActions.selectToolPan()}>
        <IconPan />
      </ToolbarButton>

      <ToolbarButton active={[MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE].includes(mode)} tooltip="Upload image"
                     onClick={event => imagesActions.selectToolUploadImage()}>
        <IconAddImage />
      </ToolbarButton>

      <ToolbarButton
        active={[MODE_VIEWING_CATALOG].includes(mode)}
        tooltip="Open catalog"
        onClick={event => projectActions.openCatalog()}>
        <IconCatalog />
      </ToolbarButton>

      {toolbarButtons.map((Component, index) => <Component mode={mode} key={index}/>)}
    </aside>
  )
}


Toolbar.propTypes = {
  state: PropTypes.object.isRequired
};

Toolbar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  editingActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  imagesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired
};
