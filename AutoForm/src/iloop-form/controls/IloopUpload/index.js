// @ts-nocheck
/**
 *
 * @author czw
 * @since 2019/8/15
 */
import React from 'react';
import { Upload, message, Row, Col, Modal, Button, Dropdown, Menu } from 'antd';
import { Icon } from '@ant-design/compatible';
import cloneDeep from 'lodash/cloneDeep';
import reqwest from 'reqwest';

/**
 * 将后台传过来的数据改造成页面上能够显示的数据
 * @param {*} oldList
 */
function saveState(oldList) {
  /** @type {{ uid: any; name: any; status: string; url: any; servies: boolean; }[]} */
  const newList = [];
  (oldList || []).forEach((item) => {
      newList.push({
          uid: item.attachmentId,
          name: item.attachmentName,
          status: 'done',
          url: item.attachmentUrl,
          servies: true,
      });
  });
  return newList;
}


export default class IloopUpload extends React.Component {
  /**
   * @param {{ value: any; maxLength: any; }} props
   */
  constructor(props) {
    super(props);
    this.state = {
      fileList: saveState(props.value),
      removeFileList: [],
      previewVisible: false,
      previewImage: null,
      maxLength: props.maxLength,
      uploading: false,
    };
  }

  /**
   * @param {{ value: any; }} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (((typeof nextProps.value) !== 'string') && nextProps.value !== this.props.value) {
      this.setState({ fileList: saveState(nextProps.value) });
    }
  }

/**
* 文件上传之前的校验
* @param {array} fileList
* @param {object} file
*/
beforeUpload = (fileList, file) => {
  const {fileSize} = this.props;
  let isLt5M = file.size / 1024 / 1024 < (Number(fileSize) || 10);
  if (!isLt5M) {
      message.error(`每个文件最大不超过${fileSize||10}M!`);
  } else {
      /**
     * @param {{ name: any; }} item
     */
      // eslint-disable-next-line array-callback-return
      (fileList || []).map((item) => {
          if (item.name === file.name) {
              isLt5M = false;
              message.error('不可重复上传同一文件');
          }
      });
  }
  return isLt5M;
}


filesList = (list) => {
  /** @type {{ attachmentName: any; attachmentUrl: any; status: string | null; }[]} */
  const files = [];
  /** @type {string[]} */
  const errorMsg = [];
  /**
   * @param {{ response: { data: any[]; msg: any; }; name: any; url: any; }} item
   */
  (list || []).forEach((item) => {
      let O = {};
      if (item.response) {
          if(!item.response.data){
           // message.error(item.response.msg);
            errorMsg.push(`${item.response.msg}(${item.name})`)
          }else{
            O.attachmentName = (item.response.data[0] || item.response.data).fileName;
            O.attachmentUrl = (item.response.data[0] || item.response.data).fileUrl;
            O.status = 'add';
            files.push(O);
          }
      } else {
          O.attachmentName = item.name;
          O.attachmentUrl = item.url;
          O.status = null;
          files.push(O);
      }
      O = {};
  });
  // 删除的附件不需要传。
 

  if(errorMsg.length) {
    message.error(errorMsg.join('\n'))
    return false;
  } else if (files.length > 0) {
    return files;
  } else {
    return [];
  }
}

/**
* 上传控件
* @param {string} buttonText
*/
getUploadButton = (buttonText) => {
  const { type, autoupload } = this.props;
  return (
    type === 'picture' ? (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{buttonText || '添加图片'}</div>
      </div>
    ) : ( 
      // eslint-disable-next-line no-script-url
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      autoupload ? <a >
        导入文件
      </a> :
      <Button>
        <Icon type="upload" />选择文件
      </Button>
    )
  );
}

handleCancel = () => {
  this.setState({ previewVisible: false });
}

getDataSource = () => {
  const { fileList, removeFileList } = this.state;
  return this.filesList(fileList, removeFileList);
}



getEdtiableUploadProps = () => {
  const { fileList, removeFileList } = this.state;
  const fileListTmp = cloneDeep(fileList);
  /** @type {any[]} */
  const removeFileListTmp = cloneDeep(removeFileList);
  const { type, action, accept, multiple, maxLength, handleUpload, autoupload } = this.props;
  const multi = multiple || maxLength > 1 || false;
  return type === 'picture' ? /**
   * @param {{ url: any; thumbUrl: any; }} file
   */
 /**
   * @param {{ uid: any; servies: any; id: any; status: string; }} file
   */
 {
      action: action || '/otm/file/upload',
      accept: accept || 'image/*, .svg',
      listType: 'picture-card',
      fileList,
      onPreview: (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
      },
      onChange: ({ fileList: newfileList }) => {

        this.setState({ fileList: newfileList });
        const { onChange } = this.props;
        if (onChange) {
          onChange(this.filesList(newfileList, removeFileList));
        }
      },
      beforeUpload: this.beforeUpload.bind(null, fileList),
      onRemove: (file) => {

          /** @type {{ uid: any; name: any; status: string; url: any; servies: boolean; }[]} */
          const newFileList = [];
          fileList.forEach((item) => {
              if (file.uid === item.uid) {
                  if (file.servies) {
                      file.id = file.uid;
                      delete file.uid;
                      file.status = 'delete';
                      removeFileListTmp.push(file);
                  }
                  return true;
              }
              newFileList.push(item);
          });
          this.setState({ fileList: newFileList, removeFileList: removeFileListTmp });
          const { onChange } = this.props;
          if (onChange) {
            onChange(this.filesList(newFileList, removeFileListTmp));
          }
      },
  } : /**
   * @param {{ uid: any; servies: any; id: any; status: string; }} file
   */
 /**
   * @param {object} file
   */
 {
    action: action || '/otm/file/upload',
    accept: accept || '.xlsx,.xls',
    multiple: multi,
    onChange: ({ fileList: newfileList }) => {
      this.setState({ fileList: newfileList });
      const { onChange } = this.props;
      if (onChange) {
        onChange(this.filesList(newfileList, removeFileList));
      }
    },
    onRemove: (file) => {
        const idx = fileListTmp.findIndex((it) => {
          return it.uid === file.uid;
        });
        if(idx>=0 && file.servies){
          file.id = file.uid;
          delete file.uid;
          file.status = 'delete';
          removeFileListTmp.push({...file});
        }
       // console.log('onRemove', file, fileListTmp, fileListTmp.splice(idx, 1));
        fileListTmp.splice(idx, 1);
        this.setState(() => {
            return {
                fileList: multi ? fileListTmp : [],
                removeFileList: removeFileListTmp
            };
        });
    },
    beforeUpload: (file) => {
      let flag = true;
      if (multi) {
        flag = this.beforeUpload(fileList, file);
      }
      if (flag && (handleUpload || autoupload)) {
        this.setState( (({ fileList }) => ({
          fileList: multi ? (fileList || []).concat([file]) : [file],
        })), ()=>{
          if(autoupload){
            this.handleUpload();
          }
        });
      }

      const result = !(handleUpload || autoupload) || false;
      return result;
    },
    fileList,
  };
}

/**
* 只读的文件上传属性
* @param {array} fileList
* @param {function} handlePreview
*/
getReadableUploadProps = () => {
  const { fileList } = this.state;
  const { type} = this.props;
  return type === 'picture' ? /**
   * @param {{ url: any; thumbUrl: any; }} file
   */
 /**
   * @param {any} file
   */
 {
      listType: 'picture-card',
      fileList,
      onPreview: (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
      },
      onRemove: (file) => {
        return false;
    },
  } : /**
   * @param {any} file
   */
 {
    onRemove: (file) => {
      return false;
    },
    fileList,
  };
}

  // 上传文件
  handleUpload = () => {
    const { fileList } = this.state;
    const { uploadAction, handleUpload } = this.props;

    if (handleUpload && typeof handleUpload === 'function') {
      handleUpload(fileList);
      return;
    }
    
    if (!uploadAction) {
      message.error('请指定上传接口');
      return;
    } 

    const { handlerProgress } = this.props;
    const formData = new FormData();
    if (fileList.length === 0) {
        message.warning('请先选择上传文件');
    }
    (fileList || []).forEach((file) => {
        formData.append('file', file);
        // formData.append('type', '2');
    });
    this.setState({
        uploading: true,
    });
    reqwest(/**
       * @param {any} data
       */
{
        url: uploadAction || '/iloopTms/requestOrder/excelImport',
        method: 'post',
        processData: false,
        contentType: false,
        data: formData,
        success: (data) => {
            message.success("上传成功");
            if (data && handlerProgress) {
              handlerProgress(this);
            }
            this.setState({
                fileList: [],
                uploading: false,
            });
        },
        error: () => {
            message.error("上传失败");
            this.setState({
                fileList: [],
                uploading: false,
            });
        },
    });
}

  getMenuItem = () => {
    const { fileList } = this.state;
    const { readonly, template, autoupload, maxLength, ...rest } = this.props;
    const flag = readonly || fileList.length >= maxLength;
    const identityUploadProps = flag ? this.getReadableUploadProps() : this.getEdtiableUploadProps();
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href={template}>
            模版下载
          </a>
        </Menu.Item>
        <Menu.Item>
          <Upload {...identityUploadProps} {...rest}>
            {flag ? null : this.getUploadButton()}
          </Upload>
        </Menu.Item>
      </Menu>
    );
    return menu;
  }

  render() {
    const { previewVisible, previewImage, fileList, maxLength, uploading } = this.state;
    const { readonly, type, template, autoupload, handleUpload, ...rest } = this.props;
    const flag = readonly || fileList.length >= maxLength;
    const identityUploadProps = flag ? this.getReadableUploadProps() : this.getEdtiableUploadProps();
    
    if(autoupload){
      return  <Dropdown overlay={this.getMenuItem()} placement="topRight">
          <Button>导入</Button>
        </Dropdown>
    }else{
      return <div style={{ minHeight: '104px' }}>
            {
              type !== 'picture'
              ? (
                <Row style={{overflow: 'visible'}}>
                  <Col span="5">
                    <Upload {...identityUploadProps} {...rest}>
                      {flag ? null : this.getUploadButton()}
                    </Upload>
                  </Col>
                  {
                        handleUpload
                        ? (
                          <Col span="5">
                            <Button style={{ marginLeft: '13px' }} onClick={this.handleUpload} uploading={uploading} disabled={fileList.length === 0}>
                              <Icon type="upload" /> {uploading ? '上传中' : '上传'}
                            </Button>
                          </Col>
                        ) : ''
                      }
                  <Col span="5">
                    {template ? <a style={{ marginLeft: '10px' }} href={template}>下载模板</a> : ''}
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Upload {...identityUploadProps} {...rest}>
                    {flag ? null : this.getUploadButton()}
                  </Upload>
                </Row>
              )
            }

            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>;
    }
    
  }
}