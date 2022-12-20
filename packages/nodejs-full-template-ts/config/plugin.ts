import { EggPlugin, EggPluginItem } from 'egg';

type PluginCustom = {
  cors: EggPluginItem
};


const plugin: EggPlugin & PluginCustom = {
  static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};

export default plugin;
